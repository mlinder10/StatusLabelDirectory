import { createClient } from "@libsql/client";
import mondaySdk from "monday-sdk-js";

const client = createClient({
  url: "libsql://sld-mlinder10.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzgwNzkwOTAsImlkIjoiODZjYTBiY2QtZWM4YS00ZDg2LWFiY2UtMWQ0M2VlNjZjMWFiIn0.ymlbjdFcC6gABlvwaClOiAKGd9ObTGmdvwAgUypnzRPjiiiKDdnrtW0ivR7GXFqccEHxChgLRNOuRUexY9iUBQ",
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
  postNotesChange: async () => {},
  updateNotes: () => {},
};
