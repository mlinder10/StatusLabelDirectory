import { VscChevronRight } from "react-icons/vsc";
import { Column } from "../config/types";
import styles from "../styles/column.module.css";
import LabelView from "./LabelView";
import { useState } from "react";

type ColumnViewProps = {
  column: Column;
  updateLabel: (cid: string, ind: string, notes: string, link: string) => void;
};

export default function ColumnView({ column, updateLabel }: ColumnViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);

  function hide(ind: string) {
    setHidden([...hidden, ind]);
  }

  function reveal() {
    setHidden([]);
  }

  return (
    <div className={styles.column}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <VscChevronRight className={`${styles.arrow} ${isOpen && styles.open}`} />
        <p className={styles.title}>{column.title}</p>
      </button>
      {isOpen && <Labels />}
    </div>
  );

  function Labels() {
    return (
      <div className={styles.labels}>
        <div>
          <p>Title</p>
          <p>Notes</p>
          <p>Link</p>
          <p>Creator</p>
          <p>LUD</p>
          <p>Hide</p>
        </div>
        {column.labels.map((label) => (
          <LabelView
            key={label.ind}
            label={label}
            updateLabel={updateLabel}
            hidden={hidden}
            hide={hide}
          />
        ))}
        <button onClick={reveal} className={styles["show-btn"]}>Show Hidden Labels</button>
      </div>
    );
  }
}
