import session from 'express-session';
import { one, run } from '../db.js';

// Minimal express-session Store backed by the sessions table in the same
// MySQL database as everything else — exists because the default
// MemoryStore doesn't survive a process restart, and on Hostinger's Web
// Apps the Node process gets recycled between requests, which was
// silently logging people out seconds after a successful login.
export class SqlSessionStore extends session.Store {
  constructor() {
    super();
    run('DELETE FROM sessions WHERE expires < ?', [Date.now()]).catch(() => {});
  }

  async get(sid, cb) {
    try {
      const row = await one('SELECT sess, expires FROM sessions WHERE sid = ?', [sid]);
      if (!row || Number(row.expires) < Date.now()) return cb(null, null);
      cb(null, JSON.parse(row.sess));
    } catch (err) {
      cb(err);
    }
  }

  async set(sid, sessionData, cb) {
    try {
      const maxAge = sessionData.cookie?.originalMaxAge ?? 1000 * 60 * 60 * 24 * 14;
      const expires = Date.now() + maxAge;
      await run(
        'INSERT INTO sessions (sid, sess, expires) VALUES (?,?,?) ON DUPLICATE KEY UPDATE sess = VALUES(sess), expires = VALUES(expires)',
        [sid, JSON.stringify(sessionData), expires]
      );
      cb?.(null);
    } catch (err) {
      cb?.(err);
    }
  }

  async destroy(sid, cb) {
    try {
      await run('DELETE FROM sessions WHERE sid = ?', [sid]);
      cb?.(null);
    } catch (err) {
      cb?.(err);
    }
  }

  async touch(sid, sessionData, cb) {
    try {
      const maxAge = sessionData.cookie?.originalMaxAge ?? 1000 * 60 * 60 * 24 * 14;
      await run('UPDATE sessions SET expires = ? WHERE sid = ?', [Date.now() + maxAge, sid]);
      cb?.(null);
    } catch (err) {
      cb?.(err);
    }
  }
}
