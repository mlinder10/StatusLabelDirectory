import LabelView from "./components/LabelView";
import useMonday from "./hooks/useMonday";

export default function App() {
  const { labels, updateLabel } = useMonday();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {labels.map((label) => (
        <LabelView key={label.text} label={label} updateLabel={updateLabel} />
      ))}
    </div>
  );
}
