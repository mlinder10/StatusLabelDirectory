import { VscArrowRight } from "react-icons/vsc";
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

  return (
    <div className={styles.column}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <VscArrowRight className={`${styles.arrow} ${isOpen && styles.open}`} />
        <p className={styles.title}>{column.title}</p>
      </button>
      {isOpen && <Labels />}
    </div>
  );

  function Labels() {
    return (
      <div className={styles.labels}>
        {column.labels.map((label) => (
          <LabelView key={label.ind} label={label} updateLabel={updateLabel} />
        ))}
      </div>
    );
  }
}
