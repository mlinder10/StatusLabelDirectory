export type ColumnSettings = {
  done_colors: number[];
  labels: [key: number, value: string];
  labels_colors: [
    key: number,
    value: {
      color: string;
      border: string;
      var_name: string;
    }
  ];
};

export type Label = {
  boardId: string;
  columnId: string;
  labelText: string;
  labelColor: string;
  labelBorder: string;
};
