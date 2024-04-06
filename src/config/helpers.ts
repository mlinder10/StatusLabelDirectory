import { ResultSet } from "@libsql/client";
import {
  Column,
  ColumnSettings,
  Label,
  MondayColumn,
  MondayLabel,
} from "./types";
import client from "./config";

export function readToLabels(
  columns: any[] | undefined,
  bid: string
): MondayColumn[] {
  if (columns === undefined) return [];

  let mondayColumns: MondayColumn[] = [];
  for (const col of columns) {
    let labels: MondayLabel[] = [];
    if (col.type !== "status") continue;
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
    mondayColumns.push({ bid, cid: col.id, title: col.title, labels });
  }
  return mondayColumns;
}

export function mergeWithDB(
  mondayColumns: MondayColumn[],
  rs: ResultSet
): Column[] {
  let columns: Column[] = [];

  for (const col of mondayColumns) {
    let labels: Label[] = [];
    for (const label of col.labels) {
      let found = false;
      for (const row of rs.rows) {
        if (row.cid === label.cid && row.ind === label.index) {
          found = true;
          labels.push({
            bid: label.bid,
            cid: label.cid,
            ind: label.index,
            txt: label.text,
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
          ind: label.index,
          txt: label.text,
          color: label.color,
          notes: "",
          link: "",
        });
      }
    }
    columns.push({ bid: col.bid, cid: col.cid, title: col.title, labels });
  }

  console.log(`PRE SORT: ${columns}`);
  columns.sort((a, b) =>
    a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1
  );
  console.log(`POST SORT: ${columns}`);

  return columns;
}

export const labelQuery = (bid: string) => `
query {
  boards(ids: [${bid}]) {
    columns {
      id
      title
      type
      settings_str
    }
  }
}
`;

export async function postLabel(label: Label, notes: string, link: string) {
  if (notes === "" && link === "") return;

  if (label.notes === "" && label.link === "") {
    await client.execute({
      sql: "insert into labels (bid, cid, ind, txt, color, notes, link) values (?, ?, ?, ?, ?, ?, ?)",
      args: [
        label.bid,
        label.cid,
        label.ind,
        label.txt,
        label.color,
        notes,
        link,
      ],
    });
    return;
  }

  await client.execute({
    sql: "update labels set notes = ?, link = ? where bid = ? and cid = ? and ind = ?",
    args: [notes, link, label.bid, label.cid, label.ind],
  });
}
