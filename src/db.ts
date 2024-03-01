import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./data/data.sqlite");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS token (main TEXT)");
});
