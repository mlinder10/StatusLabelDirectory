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

export type Label = {
  bid: string;
  cid: string;
  index: string;
  text: string;
  color: string;
  notes: string;
  link: string;
};

export type MondayLabel = {
  bid: string;
  cid: string;
  index: string;
  text: string;
  color: string;
};

export type Themes = "light" | "dark" | "black";
