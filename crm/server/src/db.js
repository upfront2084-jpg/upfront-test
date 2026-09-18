import pg from 'pg';
import { AsyncLocalStorage } from 'node:async_hooks';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Postgres returns BIGINT (COUNT(*), SUM() over integers, our sessions.expires
// column) as a string by default, to avoid silently losing precision above
// Number.MAX_SAFE_INTEGER. Every value in this app's actual range is well
// inside that, and the app code treats these as plain numbers everywhere
// (arithmetic, truthiness checks), so parse them globally here instead of
// touching every call site.
pg.types.setTypeParser(20, (val) => parseInt(val, 10));

// A real managed database, not a file on local disk: on Hostinger's Web
// Apps runtime (and most shared-hosting Node runtimes) the app's own
// filesystem does not reliably survive ordinary process restarts, let
// alone redeploys — a SQLite file living inside the app folder would
// silently reset itself back to empty/reseeded state, taking every lead,
// user and login session with it. A managed Postgres database (Hostinger's
// Web Apps integrates with Supabase for this), provisioned separately from
// the app's compute, is the fix.
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'crm_user',
      password: process.env.DB_PASSWORD || 'crm_test_pw',
      database: process.env.DB_NAME || 'upfront_crm',
      ssl: (process.env.DB_HOST && process.env.DB_HOST !== 'localhost') ? { rejectUnauthorized: false } : false,
    };

export const pool = new pg.Pool(connectionConfig);

// Lets transaction() run a whole callback on one dedicated client without
// every call site having to thread a connection through — one()/all()/run()
// below check this store first and fall back to the shared pool when not
// inside a transaction.
const als = new AsyncLocalStorage();

function conn() {
  return als.getStore() || pool;
}

// The whole app is written against `?` positional placeholders (the
// SQLite/MySQL convention) — converted to Postgres's `$1, $2, ...` here,
// once, so no route file needs to know which driver is underneath.
function toPgSql(sql) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

export async function one(sql, params = []) {
  const { rows } = await conn().query(toPgSql(sql), params);
  return rows[0] || null;
}

export async function all(sql, params = []) {
  const { rows } = await conn().query(toPgSql(sql), params);
  return rows;
}

export async function run(sql, params = []) {
  return conn().query(toPgSql(sql), params);
}

export async function transaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await als.run(client, fn);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function isEmpty() {
  const row = await one('SELECT COUNT(*) as n FROM users');
  return row.n === 0;
}

// Applies schema.sql (idempotent — every statement is CREATE TABLE/INDEX IF
// NOT EXISTS) against the configured database. Run once at boot, before
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
