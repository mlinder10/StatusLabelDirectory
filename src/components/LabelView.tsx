import { useCallback, useEffect, useState } from "react";
import { Label } from "../config/types";
import { postLabel } from "../config/helpers";

function debounce(this: any, func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

type LabelViewProps = {
  label: Label;
  updateLabel: (cid: string, ind: string, notes: string, link: string) => void;
};

export default function LabelView({ label, updateLabel }: LabelViewProps) {
  const [notes, setNotes] = useState(label.notes);
  const [link, setLink] = useState(label.link);

  const debouncedSearch = useCallback(
    debounce((notes, link) => {
      postLabel(label, notes, link);
      updateLabel(label.cid, label.ind, notes, link);
    }, 1000),
    []
  );
  
  useEffect(() => {
    debouncedSearch(notes, link);
  }, [notes, link]);
  
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
      <p style={{ backgroundColor: label.color }}>{label.color}</p>
      <p>{label.txt}</p>
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
      />
    </div>
  );
}
