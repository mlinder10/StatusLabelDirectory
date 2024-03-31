import { ResultSet } from "@libsql/client";
import { ColumnSettings, Label, MondayLabel } from "./types";

export function readToLabels(
  columns: any[] | undefined,
  bid: string
): MondayLabel[] {
  if (columns === undefined) return [];

  let labels: MondayLabel[] = [];
  for (const col of columns) {
    if (col.type === "status") continue;
    const settings: ColumnSettings = JSON.parse(col.settings_str);
    for (const [key, value] of Object.entries(settings.labels)) {
      labels.push({
        bid: bid,
        cid: col.id,
        index: key,
        text: value,
        color: settings.labels_colors[key as any].color,
      });
    }
  }
  return labels;
}

export function mergeWithDB(
  mondayLabels: MondayLabel[],
  rs: ResultSet
): Label[] {
  let labels: Label[] = [];
  for (const label of mondayLabels) {
    let found = false;
    for (const row of rs.rows) {
      if (row.cid === label.cid && row.index === label.index) {
        found = true;
        labels.push({
          bid: label.bid,
          cid: label.cid,
          index: label.index,
          text: label.text,
          color: label.color,
          notes: row.notes as string,
          link: row.link as string,
        });
      }
    }
    if (!found) {
      labels.push({
        bid: label.bid,
        cid: label.cid,
        index: label.index,
        text: label.text,
        color: label.color,
        notes: "",
        link: "",
      });
    }
  }
  return labels;
}

export const labelQuery = (bid: string) => `
query {
  boards(ids: [${bid}]) {
    columns {
      id
      type
      settings_str
    }
  }
}
`;
