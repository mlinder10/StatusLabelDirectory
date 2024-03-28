import { useEffect, useState } from "react";
import { monday } from "../config/config";
import { ColumnSettings } from "../config/types";
import { Label } from "../config/types";

export default function useMonday() {
  const [bid, setBid] = useState("");

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
      `)

      let labels: Label[] = []
      const columns = data.data.boards[0].columns
      for (const col of columns) {
        if (col.type !== "status") continue;
        const settings: ColumnSettings = JSON.parse(col.settings_str)
        for (const [key, value] of Object.entries(settings.labels)) {
          console.log(`KEY: ${key}\nVALUE: ${value}`)
          labels.push({
            boardId: bid,
            columnId: col.id,
            labelText: value,
            labelColor: settings.labels_colors[key as any].color,
            labelBorder: settings.labels_colors[key as any].border,
          })
        }
      }
      console.log(labels)
    }

    fetchData()
  }, [bid]);

  return { bid };
}
