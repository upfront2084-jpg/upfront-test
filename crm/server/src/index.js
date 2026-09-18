import express from 'express';
import session from 'express-session';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ensureSchema, isEmpty, all } from './db.js';
import { SqlSessionStore } from './lib/sessionStore.js';

import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import tasksRoutes from './routes/tasks.js';
import catalogRoutes from './routes/catalog.js';
import usersRoutes from './routes/users.js';
import campaignsRoutes from './routes/campaigns.js';
import recoveryRoutes from './routes/recovery.js';
import segmentsRoutes from './routes/segments.js';
import dashboardRoutes from './routes/dashboard.js';
import reportsRoutes from './routes/reports.js';
import searchRoutes from './routes/search.js';
import { requireAuth } from './lib/authMiddleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: '2mb' }));
app.set('trust proxy', 1);

// No top-level await here: some deploy targets (Hostinger's Web Apps among
// them) load this ESM entry file through a require()-based adapter, which
// breaks the moment a module has a top-level await. Wrapping the async
// startup work in a function and calling it without awaiting at the top
// level keeps this file requireable while still sequencing everything
// (schema, session store, routes, seed) before the server accepts
// connections.
async function start() {
  // The database schema must exist before the session store (or any
  // route) issues a single query against it — MySQL, not a local file,
  // is the actual source of truth now (see sessionStore.js/db.js for why:
  // Hostinger's Web Apps runtime doesn't reliably keep a file on local
  // disk across ordinary process restarts, only a real managed database
  // persists independently of the app's own compute).
  await ensureSchema();

  app.use(
    session({
      name: 'upfront_crm_sid',
      store: new SqlSessionStore(),
      secret: process.env.SESSION_SECRET || 'upfront-crm-dev-secret-change-me',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        // 'auto' marks the cookie secure only when the actual request came in
        // over HTTPS (honoring X-Forwarded-Proto, since trust proxy is set
        // above) — a flat NODE_ENV check would mark it secure even while the
        // domain is still being served over plain HTTP, silently dropping the
        // cookie and leaving the app stuck on a blank page after login.
        secure: 'auto',
        maxAge: 1000 * 60 * 60 * 24 * 14,
      },
    })
  );

  app.use('/api/auth', authRoutes);
  app.get('/api/health', (req, res) => res.json({ ok: true }));

  // everything else requires a logged-in session
  app.use('/api', requireAuth, leadsRoutes);
  app.use('/api', requireAuth, tasksRoutes);
  app.use('/api', requireAuth, catalogRoutes);
  app.use('/api', requireAuth, usersRoutes);
  app.use('/api', requireAuth, campaignsRoutes);
  app.use('/api', requireAuth, recoveryRoutes);
  app.use('/api', requireAuth, segmentsRoutes);
  app.use('/api', requireAuth, dashboardRoutes);
  app.use('/api', requireAuth, reportsRoutes);
  app.use('/api', requireAuth, searchRoutes);

  // In production this server also serves the built React client. It checks
  // two locations: server/public (a self-contained copy, used for deploy
  // targets that only upload/run the server/ folder on its own) and the
  // sibling ../client/dist (used in local dev and VPS deploys where the
  // whole crm/ monorepo is present together).
  const selfContainedDist = path.join(__dirname, '..', 'public');
  const siblingDist = path.join(__dirname, '..', '..', 'client', 'dist');
  const clientDist = fs.existsSync(path.join(selfContainedDist, 'index.html')) ? selfContainedDist : siblingDist;
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  });

  // Auto-seed on first boot against an empty database. This makes the app
  // self-sufficient on deploy targets with no shell/SSH access to run
  // `npm run seed` manually — the demo data appears the first time the
  // server starts against a fresh database, and never runs again afterward.
  if (await isEmpty()) {
    console.log('Banco de dados vazio — gerando dados de demonstração...');
    const { main: seed } = await import('./seed.js');
    await seed();
  }

  // Diagnostic boot log: always printed (not just on first seed), so the
  // Hostinger Runtime Logs make it obvious whether this boot found the
  // expected users already there or started from a reset/empty database —
  // useful signal if login/session problems return after a restart.
  const userRows = await all('SELECT username, role, active FROM users ORDER BY role, username');
  console.log(`Usuários no banco neste boot (${userRows.length}):`, userRows.map((u) => `${u.username}(${u.role}${u.active ? '' : ',inativo'})`).join(', '));

  // Bind explicitly to 0.0.0.0: most PaaS/container deploy targets (including
  // Hostinger's Web Apps) route external traffic to the container's public
  // interface, not just localhost/loopback, so listening on the default host
  // can leave the app unreachable even though the process is "running".
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Upfront CRM API rodando em http://0.0.0.0:${PORT}`);
  });
}

start();
