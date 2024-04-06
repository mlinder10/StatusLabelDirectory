import { useContext, useEffect, useState } from "react";
import { Label } from "../config/types";
import { postLabel } from "../config/helpers";
import styles from "../styles/label.module.css";
import { VscEye, VscFile } from "react-icons/vsc";
import { NotesContext } from "../contexts/NotesProvider";

type LabelViewProps = {
  label: Label;
  updateLinkAndCreator: (
    cid: string,
    ind: string,
    link: string,
    creator: string
  ) => void;
  hidden: string[];
  hide: (ind: string) => void;
};

export default function LabelView({
  label,
  updateLinkAndCreator,
  hidden,
  hide,
}: LabelViewProps) {
  const { notes, setNotes, setEditing, setBid, setCid, setInd } =
    useContext(NotesContext);
  const [link, setLink] = useState(label.link);
  const [creator, setCreator] = useState(label.creator);

  useEffect(() => {
    function handleChange() {
      if (link === label.link && creator === label.creator) return;
      postLabel(label, notes, link, creator);
      updateLinkAndCreator(label.cid, label.ind, link, creator);
    }

    const timeoutId = setTimeout(handleChange, 1000);
    return () => clearTimeout(timeoutId);
  }, [link, creator]);

  if (hidden.includes(label.ind)) return null;

  function handleOpenNotes() {
    setEditing(true);
    setBid(label.bid);
    setCid(label.cid);
    setInd(label.ind);
    setNotes(label.notes);
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <div
          className={styles.color}
          style={{ backgroundColor: label.color }}
        />
        <p className={styles.title}>{label.txt}</p>
      </div>
      <button onClick={handleOpenNotes} className={styles["open-btn"]}>
        <VscFile />
      </button>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
        className={styles["hover-input"]}
      />
      <input
        type="text"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        placeholder="Creator"
        className={styles["hover-input"]}
      />
      <p className={styles.date}>{label.updated}</p>
      <button onClick={() => hide(label.ind)} className={styles["hide-btn"]}>
        <VscEye />
      </button>
    </div>
  );
}
