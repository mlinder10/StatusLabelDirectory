import LabelView from "./components/LabelView";
import useMonday from "./hooks/useMonday";

export default function App() {
  const { theme, labels } = useMonday();

  return (
    <div className={theme} style={{ display: "flex", flexDirection: "column" }}>
      {labels.map((label) => (
        <LabelView key={label.text} label={label} />
      ))}
    </div>
  );
}
