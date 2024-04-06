import { useContext } from "react";
import { NotesContext } from "../contexts/NotesProvider";
import Editor from "./Editor";

export default function EditorModal() {
  const { editing, setEditing, notes } = useContext(NotesContext);

  if (!editing) return null;

  function handleClose() {
    console.log(notes);
    setEditing(false);
  }

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#000" }}>
      <button onClick={handleClose}>Close</button>
      <Editor />
    </div>
  );
}
