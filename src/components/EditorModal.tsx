import { useContext } from "react";
import { NotesContext } from "../contexts/NotesProvider";

export default function EditorModal() {
  const { editing } = useContext(NotesContext);

  if (!editing) return null;

  return (
    <div>
      <input type="text" />
    </div>
  )
}
