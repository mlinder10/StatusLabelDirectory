import ColumnView from "./components/ColumnView";
import useMonday from "./hooks/useMonday";
import styles from "./styles/app.module.css";

export default function App() {
  const { theme, columns, updateLabel } = useMonday();

  return (
    <div className={`${styles.main} ${theme}`}>
      {columns.map((col) => (
        <ColumnView key={col.cid} column={col} updateLabel={updateLabel} />
      ))}
    </div>
  );
}
