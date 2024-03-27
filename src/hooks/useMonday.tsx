import { useEffect, useState } from "react";
import { monday } from "../config/config";

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
            settings_str
          }
        }
      }
      `)
      const columns = data.data.boards[0].columns
      for (const col of columns) {
        console.log(JSON.parse(col.settings_str))
      }
    }

    fetchData()
  }, [bid]);

  return { bid };
}
