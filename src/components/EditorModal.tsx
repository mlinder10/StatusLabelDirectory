import { useContext } from "react";
import { NotesContext } from "../contexts/NotesProvider";
import Editor from "./Editor";
import styles from "../styles/modal.module.css";
import { VscClose } from "react-icons/vsc";

export default function EditorModal() {
  const { editing, setEditing } = useContext(NotesContext);

  if (!editing) return null;

  return (
    <div className={styles.modal} onClick={() => setEditing(false)}>
      <div className={styles.container}>
        <button onClick={() => setEditing(false)} className={styles.close}>
          <VscClose />
        </button>
        <Editor />
      </div>
    </div>
  );
}
