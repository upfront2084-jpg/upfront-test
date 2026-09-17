-- Upfront CRM relational schema (SQLite for dev/demo; a MySQL/Postgres
-- port only needs trivial type tweaks: TEXT->VARCHAR, INTEGER PK AUTOINCREMENT
-- differences, etc. Foreign keys are enforced so a lead's history can never
-- be deleted out from under it.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','manager','agent','teacher')),
  teacher_id TEXT REFERENCES teachers(id),
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  levels TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  hours_per_week REAL,
  duration_months INTEGER,
  price REAL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  entry_date TEXT NOT NULL,
  source_id TEXT REFERENCES sources(id),
  campaign_origin TEXT,
  owner_user_id TEXT REFERENCES users(id),
  teacher_id TEXT REFERENCES teachers(id),
  city TEXT,
  age INTEGER,
  english_level TEXT,
  objective TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'novo_lead',
  last_contact_date TEXT,
  next_contact_date TEXT,
  next_action TEXT,
  opt_out INTEGER NOT NULL DEFAULT 0,
  last_stage_change_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source_id);
CREATE INDEX IF NOT EXISTS idx_leads_entry ON leads(entry_date);

CREATE TABLE IF NOT EXISTS lead_tags (
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (lead_id, tag_id)
);

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL UNIQUE REFERENCES leads(id),
  name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS interactions (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  note TEXT,
  user_id TEXT REFERENCES users(id),
  datetime TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_interactions_lead ON interactions(lead_id);

CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id),
  text TEXT NOT NULL,
  datetime TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT,
  due_date TEXT NOT NULL,
  due_time TEXT,
  assigned_user_id TEXT REFERENCES users(id),
  note TEXT,
  status TEXT NOT NULL DEFAULT 'Pendente',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_user_id);

CREATE TABLE IF NOT EXISTS trial_classes (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'Não agendada',
  date TEXT,
  time TEXT,
  teacher_id TEXT REFERENCES teachers(id),
  level_identified TEXT,
  objective TEXT,
  teacher_notes TEXT,
  result TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_trials_lead ON trial_classes(lead_id);

CREATE TABLE IF NOT EXISTS proposals (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  package_id TEXT REFERENCES packages(id),
  package_label TEXT,
  value REAL,
  payment_method TEXT,
  special_condition TEXT,
  decision_date TEXT,
  status TEXT NOT NULL DEFAULT 'Enviada',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_proposals_lead ON proposals(lead_id);

CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  student_id TEXT NOT NULL REFERENCES students(id),
  enrollment_date TEXT NOT NULL,
  start_date TEXT,
  package_id TEXT REFERENCES packages(id),
  teacher_id TEXT REFERENCES teachers(id),
  frequency TEXT,
  schedule_text TEXT,
  monthly_value REAL,
  payment_method TEXT,
  starting_class TEXT,
  notes TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  target_description TEXT,
  date TEXT NOT NULL,
  message TEXT,
  channel TEXT,
  responsible_user_id TEXT REFERENCES users(id),
  filters_json TEXT,
  status TEXT NOT NULL DEFAULT 'Rascunho',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS campaign_recipients (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  sent_status TEXT NOT NULL DEFAULT 'Pendente',
  responded INTEGER NOT NULL DEFAULT 0,
  interested INTEGER NOT NULL DEFAULT 0,
  scheduled_trial INTEGER NOT NULL DEFAULT 0,
  enrolled INTEGER NOT NULL DEFAULT 0,
  responded_at TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_camprec_campaign ON campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_camprec_lead ON campaign_recipients(lead_id);

CREATE TABLE IF NOT EXISTS segments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  filters_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
