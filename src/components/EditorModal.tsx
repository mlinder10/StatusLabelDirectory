import { useContext } from "react";
import { NotesContext } from "../contexts/NotesProvider";
import Editor from "./Editor";
import styles from "../styles/modal.module.css";
import { VscClose } from "react-icons/vsc";

export default function EditorModal() {
  const { editing, setEditing, notes } = useContext(NotesContext);

  if (!editing) return null;

  function handleClose() {
    console.log(notes);
    setEditing(false);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button onClick={handleClose} className={styles.close}>
          <VscClose />
        </button>
        <Editor />
      </div>
    </div>
  );
}
