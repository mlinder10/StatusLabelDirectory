import { ResultSet } from "@libsql/client";
import { ColumnSettings, Label, MondayLabel } from "./types";
import client from "./config";

export function readToLabels(
  columns: any[] | undefined,
  bid: string
): MondayLabel[] {
  if (columns === undefined) return [];

  let labels: MondayLabel[] = [];
  for (const col of columns) {
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

export async function updateLabel(label: Label, notes: string, link: string) {
  if (notes === "" || link === "") return;

  try {
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
  } catch (err) {
    console.error(err);
  }
}
