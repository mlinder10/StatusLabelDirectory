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
      <div className={styles.upper}>
        <button onClick={() => setIsOpen(!open)}>
          <VscArrowRight />
        </button>
        <p>{column.cid}</p>
      </div>
      {isOpen && <Labels />}
    </div>
  );

  function Labels() {
    return (
      <div>
        {column.labels.map((label) => (
          <LabelView key={label.ind} label={label} updateLabel={updateLabel} />
        ))}
      </div>
    );
  }
}
