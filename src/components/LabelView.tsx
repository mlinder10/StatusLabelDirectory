import { useEffect, useState } from "react";
import { Label } from "../config/types";
import { postLabel } from "../config/helpers";


type LabelViewProps = {
  label: Label;
  updateLabel: (cid: string, ind: string, notes: string, link: string) => void;
};

export default function LabelView({ label, updateLabel }: LabelViewProps) {
  const [notes, setNotes] = useState(label.notes);
  const [link, setLink] = useState(label.link);

  useEffect(() => {
    function handleChange() {
      if (notes === label.notes && link === label.link) return;
      console.log(`NOTES: ${notes}, LINK: ${link}`);
      return;
      postLabel(label, notes, link);
      updateLabel(label.cid, label.ind, notes, link);
    }

    const timeoutId = setTimeout(handleChange, 1000);
    return () => clearTimeout(timeoutId);
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
