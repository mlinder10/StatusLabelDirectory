import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "../styles/editor.module.css";
import { NotesContext } from "../contexts/NotesProvider";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaRedo,
  FaRulerHorizontal,
  FaStrikethrough,
  FaUndo,
} from "react-icons/fa";

type MenuBarProps = {
  setEmpty: Dispatch<SetStateAction<boolean>>;
};

function MenuBar({ setEmpty }: MenuBarProps) {
  const { cid, ind, setNotes, postNotesChange, updateNotes } =
    useContext(NotesContext);
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!editor) return;
    const html = editor.getHTML();
    setNotes(html);
    setEmpty(editor.getText() === "");

    function handleChange() {
      postNotesChange();
      updateNotes(cid, ind, html);
    }

    const timeoutId = setTimeout(handleChange, 1000);
    return () => clearTimeout(timeoutId);
  }, [editor?.getHTML()]);

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menu}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FaListOl />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <FaRulerHorizontal />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </button>
    </div>
  );
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default function Editor() {
  const { notes } = useContext(NotesContext);
  const [empty, setEmpty] = useState(notes === "");

  return (
    <EditorProvider
      slotBefore={<MenuBar setEmpty={setEmpty} />}
      extensions={extensions}
      content={notes}
      editorProps={{
        attributes: {
          class: `${styles.editor} ${empty ? styles.empty : ""}`,
        },
      }}
    >
      <></>
    </EditorProvider>
  );
}
