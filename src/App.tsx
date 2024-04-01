import ColumnView from "./components/ColumnView";
import useMonday from "./hooks/useMonday";

export default function App() {
  const { theme, columns, updateLabel } = useMonday();

  return (
    <div className={theme} style={{ display: "flex", flexDirection: "column" }}>
      {columns.map((col) => (
        <ColumnView key={col.cid} column={col} updateLabel={updateLabel} />
      ))}
    </div>
  );
}
