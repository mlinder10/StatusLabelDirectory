import ColumnView from "./components/ColumnView";
import EditorModal from "./components/EditorModal";
import NotesProvider from "./contexts/NotesProvider";
import useMonday from "./hooks/useMonday";
import styles from "./styles/app.module.css";

export default function App() {
  const { theme, columns, updateLinkAndCreator, updateNotes } = useMonday();

  return (
    <div className={`${styles.main} ${theme}`}>
      <NotesProvider updateNotes={updateNotes}>
        {columns.map((col) => (
          <ColumnView
            key={col.cid}
            column={col}
            updateLinkAndCreator={updateLinkAndCreator}
          />
        ))}
        <EditorModal />
      </NotesProvider>
    </div>
  );
}
