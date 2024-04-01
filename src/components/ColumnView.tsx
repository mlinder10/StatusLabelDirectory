import { VscArrowRight } from "react-icons/vsc";
import { Column } from "../config/types";
import styles from "../styles/column.module.css";

type ColumnViewProps = {
  column: Column;
};

export default function ColumnView({ column }: ColumnViewProps) {
  return (
    <div className={styles.column}>
      <button>
        <VscArrowRight />
      </button>
      <p>{column.cid}</p>
    </div>
  );
}
