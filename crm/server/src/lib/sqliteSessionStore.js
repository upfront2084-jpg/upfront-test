import session from 'express-session';
import { db } from '../db.js';

// Minimal express-session Store backed by the sessions table in our own
// SQLite file. Exists because the default MemoryStore doesn't survive a
// process restart — and on at least one real deploy target (Hostinger's
// Web Apps), the Node process gets recycled between requests, which was
// silently logging people out seconds after a successful login.
export class SqliteSessionStore extends session.Store {
  constructor() {
    super();
    this.getStmt = db.prepare('SELECT sess, expires FROM sessions WHERE sid = ?');
    this.upsertStmt = db.prepare(
      'INSERT INTO sessions (sid, sess, expires) VALUES (?,?,?) ON CONFLICT(sid) DO UPDATE SET sess=excluded.sess, expires=excluded.expires'
    );
    this.destroyStmt = db.prepare('DELETE FROM sessions WHERE sid = ?');
    this.touchStmt = db.prepare('UPDATE sessions SET expires = ? WHERE sid = ?');
    this.pruneStmt = db.prepare('DELETE FROM sessions WHERE expires < ?');
    this.pruneStmt.run(Date.now());
  }

  get(sid, cb) {
    try {
      const row = this.getStmt.get(sid);
      if (!row || row.expires < Date.now()) return cb(null, null);
      cb(null, JSON.parse(row.sess));
    } catch (err) {
      cb(err);
    }
  }

  set(sid, sessionData, cb) {
    try {
      const maxAge = sessionData.cookie?.originalMaxAge ?? 1000 * 60 * 60 * 24 * 14;
      const expires = Date.now() + maxAge;
      this.upsertStmt.run(sid, JSON.stringify(sessionData), expires);
      cb?.(null);
    } catch (err) {
      cb?.(err);
    }
  }

  destroy(sid, cb) {
    try {
      this.destroyStmt.run(sid);
      cb?.(null);
    } catch (err) {
      cb?.(err);
    }
  }

  touch(sid, sessionData, cb) {
    try {
      const maxAge = sessionData.cookie?.originalMaxAge ?? 1000 * 60 * 60 * 24 * 14;
      this.touchStmt.run(Date.now() + maxAge, sid);
      cb?.(null);
    } catch (err) {
      cb?.(err);
    }
  }
}
