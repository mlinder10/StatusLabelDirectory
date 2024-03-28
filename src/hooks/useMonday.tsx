import { useEffect, useState } from "react";
import client, { monday } from "../config/config";
import { ColumnSettings } from "../config/types";
import { Label } from "../config/types";

export default function useMonday() {
  const [bid, setBid] = useState("");
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    monday.listen("context", (res) => {
      if (!res.data.user.isViewOnly) {
        const unchecked = res.data as any;
        setBid(unchecked.boardId.toString());
      }
    });

    async function fetchData() {
      const data = await monday.api(`
      query {
        boards(ids: [${bid}]) {
          columns {
            id
            type
            settings_str
          }
        }
      }
      `);

      let mondayLabels = [];
      const columns = data.data.boards[0].columns;
      for (const col of columns) {
        if (col.type !== "status") continue;
        const settings: ColumnSettings = JSON.parse(col.settings_str);
        for (const [key, value] of Object.entries(settings.labels)) {
          mondayLabels.push({
            bid: bid,
            cid: col.id,
            text: value,
            color: settings.labels_colors[key as any].color,
          });
        }
      }

      const rs = await client.execute({
        sql: "select * from labels where bid = ?",
        args: [bid],
      });

      let labels: Label[] = []
      for (const label of labels) {
        let found = false
        for (const row of rs.rows) {
          if (row.cid === label.cid && (row.color === label.color || row.text === label.text)) {
            found = true
            labels.push({
              bid,
              cid: row.cid,
              text: row.text as string,
              color: row.color as string,
              notes: row.notes as string,
              link: row.link as string,
            })
          }
        }

        if (!found) {
          labels.push({
            bid,
            cid: label.cid,
            text: label.text,
            color: label.color,
            notes: "",
            link: "",
          })
        }
      }

      setLabels(labels)
    }

    fetchData();
  }, [bid]);

  return { labels };
}
