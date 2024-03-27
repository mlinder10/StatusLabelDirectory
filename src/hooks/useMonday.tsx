import { useEffect, useState } from "react";
import { monday } from "../config/config";

export default function useMonday() {
  const [bid, setBid] = useState("569417951");

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
          id
          workspace_id
          items_page {
            items {
              id
              group {
                id
              }
              column_values {
                type
                text
                id
              }
            }
          }
        }
      `)
      console.log(data)
    }

    fetchData()
  }, []);

  return { bid };
}
