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
      console.log(data)
    }

    fetchData()
  }, [bid]);

  return { bid };
}
