import { createClient } from "@libsql/client";
import mondaySdk from "monday-sdk-js";

const client = createClient({
  url: "libsql://templates-mlinder10.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MDkxNjgwMTMsImlkIjoiZTEzOWUxYWMtZDY5Yy0xMWVlLWEwZjEtNTYyYWRhNTU1MDAyIn0.IPiKfmfsy_aebfKKuGOsLUUw150gv1I4YhfR-nGATyWuN7AMeEVJBVgx6f3-9pUmFpUyUmZ6gamrjS5yV5t8CQ",
});

export default client;

export const monday = mondaySdk();
