import { VscChevronRight, VscInfo } from "react-icons/vsc";
import { Column } from "../config/types";
import styles from "../styles/column.module.css";
import LabelView from "./LabelView";
import { useState } from "react";
import useHide from "../hooks/useHide";

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
  const { hidden, hide, reveal } = useHide();

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
            <span className={styles["info-text"]}>
              Name of the label as it appears on this board
            </span>
          </div>
          <div className={styles["header-title"]}>
            <p>Notes</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>
              Space to add rich text documentation for processes and SOPs
              associated with this label
            </span>
          </div>
          <div className={styles["header-title"]}>
            <p>Link</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>
              Space to add a link to any outside materials associated with this
              label such as videos, or other documents
            </span>
          </div>
          <div className={styles["header-title"]}>
            <p>Creator</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>
              Document here who is the creator of any documentation available
              here in the Directory
            </span>
          </div>
          <div className={styles["header-title"]}>
            <p>Last Updated</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>
              Updates automatically when a user changes any field in the
              directory
            </span>
          </div>
          <div className={styles["header-title"]}>
            <p>Hide</p>
            <VscInfo className={styles["info-icon"]} />
            <span className={styles["info-text"]}>
              Press the icon below to hide any labels that don't require
              documentation
            </span>
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
