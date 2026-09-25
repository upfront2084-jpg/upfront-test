-- Upfront CRM relational schema (PostgreSQL). Foreign keys are declared
-- with the default RESTRICT action — the app already deletes/unlinks
-- child rows in the right order before removing a parent (see the
-- *Cascade helpers in the route files), so RESTRICT here is a safety net
-- against any path that forgets to, not something the app relies on firing.

CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR(191) PRIMARY KEY,
  sess TEXT NOT NULL,
  expires BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  levels VARCHAR(255),
  active SMALLINT NOT NULL DEFAULT 1,
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  teacher_id VARCHAR(40),
  active SMALLINT NOT NULL DEFAULT 1,
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE IF NOT EXISTS sources (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(40),
  created_at VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  hours_per_week DOUBLE PRECISION,
  duration_months INT,
  price DOUBLE PRECISION,
  created_at VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  color VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(40),
  email VARCHAR(255),
  entry_date VARCHAR(40) NOT NULL,
  source_id VARCHAR(40),
  campaign_origin VARCHAR(255),
  owner_user_id VARCHAR(40),
  teacher_id VARCHAR(40),
  city VARCHAR(255),
  age INT,
  english_level VARCHAR(100),
  objective VARCHAR(255),
  notes TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'novo_lead',
  lost_reason VARCHAR(60),
  last_contact_date VARCHAR(40),
  next_contact_date VARCHAR(40),
  next_action VARCHAR(255),
  opt_out SMALLINT NOT NULL DEFAULT 0,
  last_stage_change_at VARCHAR(40),
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (source_id) REFERENCES sources(id),
  FOREIGN KEY (owner_user_id) REFERENCES users(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lost_reason VARCHAR(60);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source_id);
CREATE INDEX IF NOT EXISTS idx_leads_entry ON leads(entry_date);
CREATE INDEX IF NOT EXISTS idx_leads_lost_reason ON leads(lost_reason);

CREATE TABLE IF NOT EXISTS lead_tags (
  lead_id VARCHAR(40) NOT NULL,
  tag_id VARCHAR(40) NOT NULL,
  PRIMARY KEY (lead_id, tag_id),
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(40),
  email VARCHAR(255),
  created_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE TABLE IF NOT EXISTS interactions (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40) NOT NULL,
  type VARCHAR(40) NOT NULL,
  note TEXT,
  user_id VARCHAR(40),
  datetime VARCHAR(40) NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_interactions_lead ON interactions(lead_id);

CREATE TABLE IF NOT EXISTS notes (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40) NOT NULL,
  user_id VARCHAR(40),
  text TEXT NOT NULL,
  datetime VARCHAR(40) NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(60),
  due_date VARCHAR(40) NOT NULL,
  due_time VARCHAR(20),
  assigned_user_id VARCHAR(40),
  note TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'Pendente',
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  completed_at VARCHAR(40),
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_user_id);

CREATE TABLE IF NOT EXISTS trial_classes (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40) NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Não agendada',
  date VARCHAR(40),
  time VARCHAR(20),
  teacher_id VARCHAR(40),
  level_identified VARCHAR(100),
  objective VARCHAR(255),
  teacher_notes TEXT,
  result VARCHAR(100),
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
CREATE INDEX IF NOT EXISTS idx_trials_lead ON trial_classes(lead_id);

CREATE TABLE IF NOT EXISTS proposals (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40) NOT NULL,
  date VARCHAR(40) NOT NULL,
  package_id VARCHAR(40),
  package_label VARCHAR(255),
  value DOUBLE PRECISION,
  payment_method VARCHAR(100),
  special_condition VARCHAR(255),
  decision_date VARCHAR(40),
  status VARCHAR(40) NOT NULL DEFAULT 'Enviada',
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (package_id) REFERENCES packages(id)
);
CREATE INDEX IF NOT EXISTS idx_proposals_lead ON proposals(lead_id);

CREATE TABLE IF NOT EXISTS enrollments (
  id VARCHAR(40) PRIMARY KEY,
  lead_id VARCHAR(40) NOT NULL,
  student_id VARCHAR(40) NOT NULL,
  enrollment_date VARCHAR(40) NOT NULL,
  start_date VARCHAR(40),
  package_id VARCHAR(40),
  teacher_id VARCHAR(40),
  frequency VARCHAR(100),
  schedule_text VARCHAR(255),
  monthly_value DOUBLE PRECISION,
  discount_value DOUBLE PRECISION,
  payment_method VARCHAR(100),
  starting_class VARCHAR(255),
  notes TEXT,
  created_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (package_id) REFERENCES packages(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS discount_value DOUBLE PRECISION;

CREATE TABLE IF NOT EXISTS campaigns (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  target_description VARCHAR(255),
  date VARCHAR(40) NOT NULL,
  message TEXT,
  channel VARCHAR(40),
  responsible_user_id VARCHAR(40),
  filters_json TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'Rascunho',
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (responsible_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS campaign_recipients (
  id VARCHAR(40) PRIMARY KEY,
  campaign_id VARCHAR(40) NOT NULL,
  lead_id VARCHAR(40) NOT NULL,
  sent_status VARCHAR(40) NOT NULL DEFAULT 'Pendente',
  responded SMALLINT NOT NULL DEFAULT 0,
  interested SMALLINT NOT NULL DEFAULT 0,
  scheduled_trial SMALLINT NOT NULL DEFAULT 0,
  enrolled SMALLINT NOT NULL DEFAULT 0,
  responded_at VARCHAR(40),
  created_at VARCHAR(40) NOT NULL,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);
CREATE INDEX IF NOT EXISTS idx_camprec_campaign ON campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_camprec_lead ON campaign_recipients(lead_id);

CREATE TABLE IF NOT EXISTS segments (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  filters_json TEXT NOT NULL,
  created_at VARCHAR(40) NOT NULL,
  updated_at VARCHAR(40) NOT NULL
);
