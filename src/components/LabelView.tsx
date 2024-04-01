import { useState } from "react";
import { Label } from "../config/types";
import { VscClose, VscEdit, VscSave } from "react-icons/vsc";
import { postLabel } from "../config/helpers";

type LabelViewProps = {
  label: Label;
  updateLabel: (cid: string, ind: string, notes: string, link: string) => void;
};

export default function LabelView({ label, updateLabel }: LabelViewProps) {
  const [editing, setEditing] = useState(false);

  return editing ? <Editing /> : <Viewing />;

  function Viewing() {
    return (
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        <p style={{ backgroundColor: label.color }}>{label.color}</p>
        <p>{label.txt}</p>
        <p>{label.notes}</p>
        <p>{label.link}</p>
        <div>
          <button onClick={() => setEditing(true)}>
            <VscEdit />
          </button>
        </div>
      </div>
    );
  }

  function Editing() {
    const [notes, setNotes] = useState(label.notes);
    const [link, setLink] = useState(label.link);

    function handlePost() {
      try {
        postLabel(label, notes, link);
        setEditing(false);
        updateLabel(label.cid, label.ind, notes, link);
      } catch (err) {
        console.error(err);
      }
    }

    return (
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button onClick={handlePost}>
            <VscSave />
          </button>
          <button onClick={() => setEditing(false)}>
            <VscClose />
          </button>
        </div>
      </div>
    );
  }
}
