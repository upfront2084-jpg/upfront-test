import mysql from 'mysql2/promise';
import { AsyncLocalStorage } from 'node:async_hooks';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// A real managed database, not a file on local disk: on Hostinger's Web
// Apps runtime (and most shared-hosting Node runtimes) the app's own
// filesystem does not reliably survive ordinary process restarts, let
// alone redeploys — a SQLite file living inside the app folder would
// silently reset itself back to empty/reseeded state, taking every lead,
// user and login session with it. MySQL, provisioned separately from the
// app's compute, is the fix.
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'crm_user',
  password: process.env.DB_PASSWORD || 'crm_test_pw',
  database: process.env.DB_NAME || 'upfront_crm',
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

// Lets transaction() run a whole callback on one dedicated connection
// without every call site having to thread a connection object through —
// one()/all()/run() below check this store first and fall back to the
// shared pool when not inside a transaction.
const als = new AsyncLocalStorage();

function conn() {
  return als.getStore() || pool;
}

export async function one(sql, params = []) {
  const [rows] = await conn().query(sql, params);
  return rows[0] || null;
}

export async function all(sql, params = []) {
  const [rows] = await conn().query(sql, params);
  return rows;
}

export async function run(sql, params = []) {
  const [result] = await conn().query(sql, params);
  return result;
}

export async function transaction(fn) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await als.run(connection, fn);
    await connection.commit();
    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export async function isEmpty() {
  const row = await one('SELECT COUNT(*) as n FROM users');
  return row.n === 0;
}

// Applies schema.sql (idempotent — every statement is CREATE TABLE IF NOT
// EXISTS) against the configured database. Run once at boot, before
// anything else touches the database.
export async function ensureSchema() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const raw = fs.readFileSync(schemaPath, 'utf8');
  const withoutComments = raw
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');
  const statements = withoutComments
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const stmt of statements) {
    await pool.query(stmt);
  }
}

export default pool;
