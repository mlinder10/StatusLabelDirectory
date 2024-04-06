export type ColumnSettings = {
  done_colors: number[];
  labels: { [key: number]: string };
  labels_colors: {
    [key: number]: {
      color: string;
      border: string;
      var_name: string;
    };
  };
};

export type Column = {
  bid: string;
  cid: string;
  title: string;
  labels: Label[];
};

export type Label = {
  bid: string;
  cid: string;
  ind: string;
  txt: string;
  color: string;
  notes: string;
  link: string;
  creator: string;
  updated: string;
};

export type MondayColumn = {
  bid: string;
  cid: string;
  title: string;
  labels: MondayLabel[];
};

export type MondayLabel = {
  bid: string;
  cid: string;
  index: string;
  text: string;
  color: string;
};

export type Themes = "light" | "dark" | "black";

export type NotesContextType = {
  bid: string;
  cid: string;
  ind: string;
  notes: string;
  editing: boolean;
  setBid: (bid: string) => void;
  setCid: (cid: string) => void;
  setInd: (ind: string) => void;
  setNotes: (notes: string) => void;
  setEditing: (editing: boolean) => void;
  postNotesChange: () => Promise<void>;
};

export const mockColumns = [
  {
    bid: "1",
    cid: "1",
    title: "To Do",
    labels: [
      {
        bid: "1",
        cid: "1",
        index: "1",
        text: "To Do",
        color: "#ff0000",
        notes: "",
        link: "",
        creator: "",
        updated: "",
      },
    ],
  },
];
