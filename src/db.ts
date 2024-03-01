import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./data/data.sqlite",
  driver: sqlite3.Database,
});

await db.run("CREATE TABLE IF NOT EXISTS token (main TEXT)");
