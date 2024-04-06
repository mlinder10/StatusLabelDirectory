import { useEffect, useState } from "react";
import { Label } from "../config/types";
import { postLabel } from "../config/helpers";
import styles from "../styles/label.module.css";
import { VscEye } from "react-icons/vsc";

type LabelViewProps = {
  label: Label;
  updateLabel: (
    cid: string,
    ind: string,
    notes: string,
    link: string,
    creator: string
  ) => void;
  hidden: string[];
  hide: (ind: string) => void;
};

export default function LabelView({
  label,
  updateLabel,
  hidden,
  hide,
}: LabelViewProps) {
  const [notes, setNotes] = useState(label.notes);
  const [link, setLink] = useState(label.link);
  const [creator, setCreator] = useState(label.creator);

  useEffect(() => {
    function handleChange() {
      if (
        notes === label.notes &&
        link === label.link &&
        creator === label.creator
      )
        return;
      postLabel(label, notes, link, creator);
      updateLabel(label.cid, label.ind, notes, link, creator);
    }

    const timeoutId = setTimeout(handleChange, 1000);
    return () => clearTimeout(timeoutId);
  }, [notes, link, creator]);

  if (hidden.includes(label.ind)) return null;

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <div
          className={styles.color}
          style={{ backgroundColor: label.color }}
        />
        <p className={styles.title}>{label.txt}</p>
      </div>
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
      <input
        type="text"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        placeholder="Creator"
      />
      <p>{label.updated}</p>
      <button onClick={() => hide(label.ind)} className={styles["hide-btn"]}>
        <VscEye />
      </button>
    </div>
  );
}
