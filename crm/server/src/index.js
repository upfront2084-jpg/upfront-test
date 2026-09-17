import express from 'express';
import session from 'express-session';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import './db.js'; // ensures schema is applied before routes touch the db

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
app.use(
  session({
    name: 'upfront_crm_sid',
    secret: process.env.SESSION_SECRET || 'upfront-crm-dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' && process.env.COOKIE_SECURE !== 'false',
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

// Bind explicitly to 0.0.0.0: most PaaS/container deploy targets (including
// Hostinger's Web Apps) route external traffic to the container's public
// interface, not just localhost/loopback, so listening on the default host
// can leave the app unreachable even though the process is "running".
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Upfront CRM API rodando em http://0.0.0.0:${PORT}`);
});
