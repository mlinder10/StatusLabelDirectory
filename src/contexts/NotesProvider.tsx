import { createContext, ReactNode, useState } from "react";
import { NotesContextType } from "../config/types";
import client, { defaultNotesContext } from "../config/config";

export const NotesContext =
  createContext<NotesContextType>(defaultNotesContext);

type NotesProviderProps = {
  children: ReactNode;
  updateNotes: (cid: string, ind: string, notes: string) => void;
};

export default function NotesProvider({ children, updateNotes }: NotesProviderProps) {
  const [bid, setBid] = useState("");
  const [cid, setCid] = useState("");
  const [ind, setInd] = useState("");
  const [notes, setNotes] = useState("");
  const [editing, setEditing] = useState(false);

  async function postNotesChange() {
    if (!bid || !cid || !ind) return;
    await client.execute({
      sql: "update labels set notes = ? where bid = ? and cid = ? and ind = ?",
      args: [notes, bid, cid, ind],
    });
  }

  return (
    <NotesContext.Provider
      value={{
        bid,
        cid,
        ind,
        notes,
        editing,
        setBid,
        setCid,
        setInd,
        setNotes,
        setEditing,
        postNotesChange,
        updateNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
