// import LabelView from "./components/LabelView";
// import useMonday from "./hooks/useMonday";

import { query } from "./config/helpers";

export default function App() {
  return (
    <button onClick={() => query()}>Query</button>
  )
  // const { labels, updateLabel } = useMonday();

  // return (
  //   <div style={{ display: "flex", flexDirection: "column" }}>
  //     {labels.map((label) => (
  //       <LabelView key={label.text} label={label} updateLabel={updateLabel} />
  //     ))}
  //   </div>
  // );
}
