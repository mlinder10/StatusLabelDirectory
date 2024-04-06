import { createContext, ReactNode, useState } from "react";
import { NotesContextType } from "../config/types";
import { defaultNotesContext } from "../config/config";

export const NotesContext = createContext<NotesContextType>(defaultNotesContext);

type NotesProviderProps = {
  children: ReactNode;
};

export default function NotesProvider({ children }: NotesProviderProps) {
  const [bid, setBid] = useState("");
  const [cid, setCid] = useState("");
  const [ind, setInd] = useState("");
  const [notes, setNotes] = useState("");
  const [editing, setEditing] = useState(false);

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
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
