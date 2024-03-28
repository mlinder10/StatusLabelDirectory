import { Label } from "../config/types";

type LabelViewProps = {
  label: Label;
};

export default function LabelView({ label }: LabelViewProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
      <p style={{ backgroundColor: label.color }}>{label.color}</p>
      <p>{label.text}</p>
      <p>{label.notes}</p>
      <p>{label.link}</p>
    </div>
  );
}
