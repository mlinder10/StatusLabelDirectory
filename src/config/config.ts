import { createClient } from "@libsql/client";
import mondaySdk from "monday-sdk-js";

const client = createClient({
  url: "libsql://sld-mlinder10.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTE1OTEzMDUsImlkIjoiYmVhNjVkNzQtNDRiNS00MDljLTg4YmItMWZhNzRhMzIxY2FjIn0.V2UweIeVxteKbha_xP4Q_rA3cHjLNeSy9N42aBI8np3cfQNkSeUXnrDDHJOwTRFyTwQhdvwG67_BrozqEX2LBA",
});

export default client;

export const monday = mondaySdk();

export const defaultNotesContext = {
  bid: "",
  cid: "",
  ind: "",
  notes: "",
  editing: false,
  setBid: () => {},
  setCid: () => {},
  setInd: () => {},
  setNotes: () => {},
  setEditing: () => {},
};
