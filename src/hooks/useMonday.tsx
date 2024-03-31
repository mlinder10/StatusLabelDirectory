import { useEffect, useState } from "react";
import client, { monday } from "../config/config";
import { Label, Themes } from "../config/types";
import { labelQuery, mergeWithDB, readToLabels } from "../config/helpers";

export default function useMonday() {
  const [bid, setBid] = useState("");
  const [theme, setTheme] = useState<Themes>("dark")
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    monday.listen("context", (res) => {
      if (!res.data.user.isViewOnly) {
        const unchecked = res.data as any;
        setTheme(unchecked.theme)
        setBid(unchecked.boardId.toString());
      }
    });

    async function fetchData() {
      try {
        const data = await monday.api(labelQuery(bid));
        const columns = data.data.boards[0]?.columns;
        const mondayLabels = readToLabels(columns, bid);
        const rs = await client.execute({
          sql: "select * from labels where bid = ?",
          args: [bid],
        });
        // const rs = { rows: [] as any };
        const labels = mergeWithDB(mondayLabels, rs);

        console.log("LABELS:", labels);
        setLabels(labels);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [bid]);

  async function updateLabel(label: Label, notes: string, link: string) {
    if (notes === "" || link === "") return;

    if (label.notes === "" && label.link === "") {
      await client.execute({
        sql: "insert into labels (bid, cid, index, text, color, notes, link) values (?, ?, ?, ?, ?, ?, ?)",
        args: [label.bid, label.cid, label.index, label.text, label.color, notes, link],
      });
      return;
    }

    await client.execute({
      sql: "update labels set notes = ?, link = ? where bid = ? and cid = ? and index = ?",
      args: [notes, link, label.bid, label.cid, label.index],
    })
  }

  return { theme, labels, updateLabel };
}
