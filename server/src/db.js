import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dbPath = path.resolve(process.cwd(), process.env.DB_PATH || "./data/shanhe.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  create table if not exists users (
    id integer primary key autoincrement,
    username text not null unique,
    display_name text not null,
    password_hash text not null,
    created_at text not null default (datetime('now'))
  );

  create table if not exists trip_plans (
    user_id integer primary key,
    plans_json text not null default '{}',
    updated_at text not null default (datetime('now')),
    foreign key (user_id) references users(id) on delete cascade
  );
`);

export default db;
