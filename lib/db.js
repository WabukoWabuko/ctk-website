import { sql } from '@vercel/postgres';

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS rotas (
      id SERIAL PRIMARY KEY,
      date TEXT NOT NULL,
      reader TEXT NOT NULL,
      preacher TEXT NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS hymns (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      file_url TEXT NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS sermons (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      file_url TEXT NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS prayers (
      id SERIAL PRIMARY KEY,
      request TEXT NOT NULL,
      submitted_at TEXT NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at TEXT NOT NULL
    );
  `;
}

export async function getDb() {
  return sql;
}
