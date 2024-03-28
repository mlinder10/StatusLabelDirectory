import { useEffect, useState } from "react";
import { monday } from "../config/config";
// import { Label } from "../config/types";

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

      // let labels: Label[] = []
      const columns = data.data.boards[0].columns
      for (const col of columns) {
        const settings = JSON.parse(col.settings_str)
        console.log(settings)
      }
    }

    fetchData()
  }, [bid]);

  return { bid };
}
