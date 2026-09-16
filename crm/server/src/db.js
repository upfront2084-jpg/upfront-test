import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.CRM_DB_PATH || path.join(dataDir, 'crm.sqlite');

export const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// ---- Small helpers on top of node:sqlite's prepared statements ----------

export function all(sql, params = []) {
  return db.prepare(sql).all(...params);
}

export function one(sql, params = []) {
  return db.prepare(sql).get(...params) || null;
}

export function run(sql, params = []) {
  return db.prepare(sql).run(...params);
}

export function transaction(fn) {
  db.exec('BEGIN');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
}

export function isEmpty() {
  const row = one('SELECT COUNT(*) as n FROM users');
  return row.n === 0;
}

export default db;
