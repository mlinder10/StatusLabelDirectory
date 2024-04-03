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
