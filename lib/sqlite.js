import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function openDb() {
  if (!db) {
    db = await open({
      filename: './data/ctk.db',
      driver: sqlite3.Database,
    });
  }
  return db;
}
