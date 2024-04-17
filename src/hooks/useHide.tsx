import { useEffect, useState } from "react";
import { Hidden } from "../config/types";

export default function useHide() {
  const [hidden, setHidden] = useState<Hidden[]>([]);

  function getHidden() {
    const local = window.localStorage.getItem("hidden");
    if (!local) return;
    const parse = JSON.parse(local);
    if (!parse) return;
    setHidden(parse);
  }

  function hide(bid: string, cid: string, ind: string) {
    const newHidden = [...hidden, { bid, cid, ind }];
    setHidden(newHidden);
    window.localStorage.setItem("hidden", JSON.stringify(newHidden));
  }

  function reveal() {
    setHidden([]);
    window.localStorage.removeItem("hidden");
  }

  useEffect(() => {
    getHidden();
  }, []);

  return { hidden, hide, reveal };
}
