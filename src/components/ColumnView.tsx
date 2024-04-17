import { VscChevronRight, VscInfo } from "react-icons/vsc";
import { Column } from "../config/types";
import styles from "../styles/column.module.css";
import LabelView from "./LabelView";
import { useState } from "react";

type ColumnViewProps = {
  column: Column;
  updateLinkAndCreator: (
    cid: string,
    ind: string,
    link: string,
    creator: string
  ) => void;
};

export default function ColumnView({
  column,
  updateLinkAndCreator,
}: ColumnViewProps) {
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
        <VscChevronRight
          className={`${styles.arrow} ${isOpen && styles.open}`}
        />
        <p className={styles.title}>{column.title}</p>
      </button>
      {isOpen && <Labels />}
    </div>
  );

  function Labels() {
    return (
      <div className={styles.labels}>
        <div className={styles.header}>
          <div className={styles["header-title"]}>
            <p>Label</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>Some text</span>
          </div>
          <div className={styles["header-title"]}>
            <p>Notes</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>Some text</span>
          </div>
          <div className={styles["header-title"]}>
            <p>Link</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>Some text</span>
          </div>
          <div className={styles["header-title"]}>
            <p>Creator</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>Some text</span>
          </div>
          <div className={styles["header-title"]}>
            <p>Last Updated</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>Some text</span>
          </div>
          <div className={styles["header-title"]}>
            <p>Hide</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>Some text</span>
          </div>
        </div>
        {column.labels.map((label) => (
          <LabelView
            key={label.ind}
            label={label}
            updateLinkAndCreator={updateLinkAndCreator}
            hidden={hidden}
            hide={hide}
          />
        ))}
        {hidden.length > 0 && (
          <button onClick={reveal} className={styles["show-btn"]}>
            Show Hidden Labels
          </button>
        )}
      </div>
    );
  }
}
