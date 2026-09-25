// Populates the SQLite database with a realistic, internally-consistent
// set of demo data: users, sources, teachers, packages, tags, segments,
// and ~150 leads each carrying a simulated funnel history (interactions,
// trial classes, proposals, enrollments) plus tasks and a handful of
// recovery campaigns. Run with `npm run seed`.

import { run, all, transaction } from './db.js';
import { uid, nowISO, todayISO, addDaysISO, daysBetween } from './lib/util.js';
import { hashPassword } from './lib/password.js';
import { makeRandom } from './lib/rng.js';
import {
  STAGE_KEYS,
  TRIAL_RESULT,
  ENGLISH_LEVELS,
  OBJECTIVES,
  DEFAULT_SOURCES,
  TASK_STATUS,
  LOST_REASON_KEYS,
} from './lib/constants.js';

const rng = makeRandom(2026);
const TODAY = todayISO();

const FIRST_NAMES_F = [
  'Ana', 'Beatriz', 'Camila', 'Daniela', 'Fernanda', 'Gabriela', 'Helena', 'Isabela', 'Juliana', 'Larissa',
  'Mariana', 'Natália', 'Patrícia', 'Rafaela', 'Sabrina', 'Tatiana', 'Vitória', 'Yasmin', 'Carolina', 'Letícia',
  'Amanda', 'Bruna', 'Camille', 'Débora', 'Eduarda', 'Flávia', 'Giovanna', 'Heloísa', 'Ingrid', 'Jéssica',
];
const FIRST_NAMES_M = [
  'André', 'Bruno', 'Carlos', 'Diego', 'Eduardo', 'Felipe', 'Gustavo', 'Henrique', 'Igor', 'João',
  'Kaique', 'Lucas', 'Marcelo', 'Nicolas', 'Otávio', 'Pedro', 'Rafael', 'Samuel', 'Thiago', 'Vinícius',
  'Alexandre', 'Bernardo', 'Caio', 'Daniel', 'Enzo', 'Fábio', 'Gabriel', 'Hugo', 'Ivan', 'José',
];
const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa',
  'Rocha', 'Dias', 'Monteiro', 'Cardoso', 'Reis', 'Araújo', 'Teixeira', 'Correia', 'Nunes', 'Duarte',
];
const CITIES = [
  'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS',
  'Salvador, BA', 'Recife, PE', 'Fortaleza, CE', 'Brasília, DF', 'Campinas, SP', 'Florianópolis, SC',
  'Goiânia, GO', 'Belém, PA', 'Manaus, AM', 'Vitória, ES', 'Natal, RN', 'Uberlândia, MG', 'Joinville, SC',
];
const DDDS = ['11', '21', '31', '41', '51', '61', '71', '81', '85', '47', '27', '62', '92'];
const EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com.br', 'icloud.com'];

function stripAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}
function randomPerson() {
  const gender = rng.bool() ? 'F' : 'M';
  const first = rng.pick(gender === 'F' ? FIRST_NAMES_F : FIRST_NAMES_M);
  const last = rng.pick(LAST_NAMES);
  const last2 = rng.bool(0.4) ? ' ' + rng.pick(LAST_NAMES) : '';
  return { name: `${first} ${last}${last2}`, first, last };
}
function randomEmail(first, last) {
  const domain = rng.pick(EMAIL_DOMAINS);
  const sep = rng.pick(['.', '']);
  const num = rng.bool(0.3) ? rng.int(1, 99) : '';
  return `${stripAccents(first).toLowerCase()}${sep}${stripAccents(last).toLowerCase()}${num}@${domain}`;
}
function randomWhatsapp() {
  const ddd = rng.pick(DDDS);
  const p1 = rng.int(9000, 9999);
  const p2 = rng.int(1000, 9999);
  return `+55 ${ddd} 9${p1}-${p2}`;
}
function randomTime() {
  const h = String(rng.int(8, 20)).padStart(2, '0');
  const m = rng.pick(['00', '15', '30', '45']);
  return `${h}:${m}`;
}
function isoDateTime(dateStr) {
  return `${dateStr}T${randomTime()}:00.000Z`;
}
function clampToday(dateStr) {
  return dateStr > TODAY ? TODAY : dateStr;
}

// ---------------------------------------------------------------------
// 1) Wipe existing data (idempotent reseed)
// ---------------------------------------------------------------------
async function wipe() {
  const tables = [
    'campaign_recipients', 'campaigns', 'enrollments', 'proposals', 'trial_classes',
    'tasks', 'notes', 'interactions', 'lead_tags', 'students', 'leads',
    'segments', 'tags', 'packages', 'sources', 'users', 'teachers',
  ];
  for (const t of tables) await run(`DELETE FROM ${t}`);
}

// ---------------------------------------------------------------------
// 2) Reference data: teachers, users, sources, packages, tags, segments
// ---------------------------------------------------------------------
async function seedReferenceData() {
  const now = nowISO();

  const teacherDefs = [
    { name: 'Prof. Ricardo Nunes', email: 'ricardo.nunes@upfrontschool.com', levels: 'Intermediário, Avançado' },
    { name: 'Prof. Camila Duarte', email: 'camila.duarte@upfrontschool.com', levels: 'Iniciante, Básico' },
    { name: 'Prof. Lucas Martins', email: 'lucas.martins@upfrontschool.com', levels: 'Todos os níveis' },
    { name: 'Prof. Beatriz Lins', email: 'beatriz.lins@upfrontschool.com', levels: 'Business English' },
    { name: 'Prof. André Falcão', email: 'andre.falcao@upfrontschool.com', levels: 'Conversação, Exames' },
  ];
  const teachers = [];
  for (const t of teacherDefs) {
    const id = uid('tch');
    await run(
      `INSERT INTO teachers (id, name, email, levels, active, created_at, updated_at) VALUES (?,?,?,?,1,?,?)`,
      [id, t.name, t.email, t.levels, now, now]
    );
    teachers.push({ id, ...t });
  }

  const userDefs = [
    { name: 'Ana Beatriz Souza', username: 'admin', email: 'admin@upfrontschool.com', role: 'admin' },
    { name: 'Carlos Eduardo Lima', username: 'carlos.lima', email: 'gestor@upfrontschool.com', role: 'manager' },
    { name: 'Fernanda Rocha', username: 'fernanda', email: 'fernanda@upfrontschool.com', role: 'agent' },
    { name: 'João Pedro Alves', username: 'joao', email: 'joao@upfrontschool.com', role: 'agent' },
    { name: 'Marina Costa', username: 'marina', email: 'marina@upfrontschool.com', role: 'agent' },
    { name: 'Prof. Ricardo Nunes', username: 'ricardo.nunes', email: 'ricardo.nunes@upfrontschool.com', role: 'teacher', teacherId: teachers[0].id },
    { name: 'Prof. Camila Duarte', username: 'camila.duarte', email: 'camila.duarte@upfrontschool.com', role: 'teacher', teacherId: teachers[1].id },
  ];
  const passwordHash = hashPassword('upfront123');
  const users = [];
  for (const u of userDefs) {
    const id = uid('usr');
    await run(
      `INSERT INTO users (id, name, username, email, password_hash, role, teacher_id, active, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,1,?,?)`,
      [id, u.name, u.username, u.email, passwordHash, u.role, u.teacherId || null, now, now]
    );
    users.push({ id, ...u });
  }

  const sources = [];
  for (const s of DEFAULT_SOURCES) {
    const id = uid('src');
    await run(`INSERT INTO sources (id, name, icon, created_at) VALUES (?,?,?,?)`, [id, s.name, s.icon || null, now]);
    sources.push({ id, ...s });
  }

  const packageDefs = [
    { name: 'Conversação Flex', description: '2x por semana, foco em fluência', hoursPerWeek: 2, durationMonths: 6, price: 320 },
    { name: 'Standard', description: '3x por semana, trilha completa', hoursPerWeek: 3, durationMonths: 12, price: 420 },
    { name: 'Intensivo', description: '5x por semana, imersão total', hoursPerWeek: 5, durationMonths: 8, price: 690 },
    { name: 'Business English', description: '2x por semana, inglês corporativo', hoursPerWeek: 2, durationMonths: 6, price: 480 },
    { name: 'Exam Prep (IELTS/TOEFL)', description: '2x por semana, preparatório de exames', hoursPerWeek: 2, durationMonths: 4, price: 550 },
  ];
  const packages = [];
  for (const p of packageDefs) {
    const id = uid('pkg');
    await run(
      `INSERT INTO packages (id, name, description, hours_per_week, duration_months, price, created_at) VALUES (?,?,?,?,?,?,?)`,
      [id, p.name, p.description, p.hoursPerWeek, p.durationMonths, p.price, now]
    );
    packages.push({ id, ...p });
  }

  const tagDefs = [
    { name: 'Inglês para viagem', color: '#2F6FED' },
    { name: 'Inglês para trabalho', color: '#16A34A' },
    { name: 'Conversação', color: '#F5A524' },
    { name: 'Intercâmbio', color: '#8B5CF6' },
    { name: 'Indicação VIP', color: '#C026D3' },
    { name: 'Lead antigo', color: '#5B6485' },
  ];
  const tags = [];
  for (const t of tagDefs) {
    const id = uid('tag');
    await run(`INSERT INTO tags (id, name, color) VALUES (?,?,?)`, [id, t.name, t.color]);
    tags.push({ id, ...t });
  }

  return { teachers, users, sources, packages, tags };
}

// ---------------------------------------------------------------------
// 3) Simulate one lead's whole journey through the funnel
// ---------------------------------------------------------------------
function simulateLead(ctx) {
  const { sources, users, teachers, packages } = ctx;
  const agents = users.filter((u) => u.role === 'agent' || u.role === 'manager');
  const person = randomPerson();
  const source = rng.weighted([
    [sources.find((s) => s.name === 'Instagram'), 30],
    [sources.find((s) => s.name === 'Indicação'), 15],
    [sources.find((s) => s.name === 'Google'), 15],
    [sources.find((s) => s.name === 'Facebook'), 10],
    [sources.find((s) => s.name === 'Site'), 10],
    [sources.find((s) => s.name === 'WhatsApp'), 6],
    [sources.find((s) => s.name === 'TikTok'), 6],
    [sources.find((s) => s.name === 'YouTube'), 4],
    [sources.find((s) => s.name === 'Outros'), 4],
  ]);
  const owner = rng.pick(agents);

  // entry date skewed towards more recent days over the last ~210 days
  const maxAgeDays = 210;
  const skew = Math.pow(rng.float(), 1.6); // closer to 0 => more recent
  const entryDate = addDaysISO(TODAY, -Math.round(skew * maxAgeDays));

  const campaignOriginPool = [
    'Anúncio - Aulas Gratuitas Setembro', 'Anúncio - Volta às Aulas', 'Post Orgânico - Depoimento Aluno',
    'Indicação de aluno', 'Busca Orgânica', '', '', '',
  ];

  const lead = {
    id: uid('lead'),
    name: person.name,
    whatsapp: randomWhatsapp(),
    email: randomEmail(person.first, person.last),
    entryDate,
    sourceId: source.id,
    campaignOrigin: rng.pick(campaignOriginPool),
    ownerUserId: owner.id,
    teacherId: null,
    city: rng.pick(CITIES),
    age: rng.int(16, 58),
    englishLevel: rng.pick(ENGLISH_LEVELS),
    objective: rng.pick(OBJECTIVES),
    notes: '',
    status: 'novo_lead',
    lastContactDate: entryDate,
    nextContactDate: addDaysISO(entryDate, 1),
    nextAction: 'Fazer primeiro contato',
    optOut: rng.bool(0.04) ? 1 : 0,
    lastStageChangeAt: isoDateTime(entryDate),
  };

  const interactions = [];
  const tasks = [];
  let trial = null;
  let proposal = null;
  let enrollment = null;
  let student = null;

  function addInteraction(type, note, date) {
    interactions.push({
      id: uid('int'), leadId: lead.id, type, note,
      userId: owner.id, datetime: isoDateTime(clampToday(date)),
    });
  }
  function setStage(stage, date) {
    lead.status = stage;
    lead.lastStageChangeAt = isoDateTime(clampToday(date));
    if (stage === 'perdido') lead.lostReason = rng.pick(LOST_REASON_KEYS);
  }
  function stillFuture(date) {
    return date > TODAY;
  }

  addInteraction('criacao', `Lead cadastrado via ${source.name}`, entryDate);

  let cursor = entryDate;

  // ---- primeiro contato -------------------------------------------------
  const contactDate = addDaysISO(cursor, rng.int(0, 2));
  if (stillFuture(contactDate) || !rng.bool(0.93)) {
    lead.nextContactDate = clampToday(contactDate) === TODAY ? addDaysISO(TODAY, rng.int(0, 2)) : contactDate;
    finalizeOpenLead();
    return finish();
  }
  addInteraction('contato', 'Primeiro contato realizado via WhatsApp', contactDate);
  setStage('primeiro_contato', contactDate);
  lead.lastContactDate = contactDate;
  cursor = contactDate;

  // ---- em conversa --------------------------------------------------------
  const convDate = addDaysISO(cursor, rng.int(0, 3));
  if (stillFuture(convDate) || !rng.bool(0.8)) {
    lead.nextContactDate = stillFuture(convDate) ? convDate : addDaysISO(TODAY, rng.int(0, 2));
    lead.nextAction = 'Retomar conversa';
    finalizeOpenLead();
    return finish();
  }
  addInteraction('etapa', 'Lead engajado, conversa em andamento sobre objetivos e nível', convDate);
  setStage('em_conversa', convDate);
  lead.lastContactDate = convDate;
  cursor = convDate;

  // ---- agenda experimental -------------------------------------------------
  const scheduleDate = addDaysISO(cursor, rng.int(0, 4));
  if (stillFuture(scheduleDate) || !rng.bool(0.62)) {
    lead.nextContactDate = stillFuture(scheduleDate) ? scheduleDate : addDaysISO(TODAY, rng.int(0, 3));
    lead.nextAction = 'Oferecer aula experimental';
    finalizeOpenLead();
    return finish();
  }
  const teacher = rng.pick(teachers);
  lead.teacherId = teacher.id;
  const trialDate = addDaysISO(scheduleDate, rng.int(1, 8));
  addInteraction('experimental', `Aula experimental agendada para ${trialDate} com ${teacher.name}`, scheduleDate);
  setStage('experimental_agendada', scheduleDate);
  lead.lastContactDate = scheduleDate;
  cursor = scheduleDate;

  trial = {
    id: uid('trl'), leadId: lead.id, status: 'Agendada', date: trialDate, time: randomTime(),
    teacherId: teacher.id, levelIdentified: null, objective: lead.objective, teacherNotes: null, result: null,
  };

  if (stillFuture(trialDate)) {
    lead.nextContactDate = trialDate;
    lead.nextAction = 'Confirmar presença na aula experimental';
    tasks.push(makeTask(lead, 'Confirmar experimental', trialDate, owner.id, 'Confirmar presença do lead na aula experimental agendada.'));
    return finish();
  }

  // ---- trial happened (or not) --------------------------------------------
  const trialOutcome = rng.weighted([['realizada', 0.72], ['faltou', 0.14], ['cancelada', 0.06], ['reagendada', 0.08]]);

  if (trialOutcome === 'cancelada') {
    trial.status = 'Cancelada';
    addInteraction('experimental', 'Aula experimental cancelada pelo lead', trialDate);
    setStage(rng.bool(0.6) ? 'perdido' : 'recuperacao', trialDate);
    lead.lastContactDate = trialDate;
    lead.nextAction = 'Reengajar lead';
    return finish();
  }

  if (trialOutcome === 'faltou') {
    trial.status = 'Faltou';
    addInteraction('experimental', 'Aluno não compareceu à aula experimental', trialDate);
    lead.lastContactDate = trialDate;
    if (daysBetween(TODAY, trialDate) > 12) {
      setStage('recuperacao', trialDate);
      lead.nextAction = 'Tentar reagendar experimental';
    } else {
      setStage('experimental_agendada', trialDate);
      lead.nextContactDate = addDaysISO(trialDate, 2);
      lead.nextAction = 'Tentar reagendar experimental';
      tasks.push(makeTask(lead, 'Confirmar experimental', lead.nextContactDate, owner.id, 'Lead faltou, tentar reagendar.'));
    }
    return finish();
  }

  let effectiveTrialDate = trialDate;
  if (trialOutcome === 'reagendada') {
    const secondDate = addDaysISO(trialDate, rng.int(3, 10));
    addInteraction('experimental', 'Aula experimental reagendada a pedido do lead', trialDate);
    if (stillFuture(secondDate)) {
      trial.status = 'Reagendada';
      trial.date = secondDate;
      setStage('experimental_agendada', trialDate);
      lead.lastContactDate = trialDate;
      lead.nextContactDate = secondDate;
      lead.nextAction = 'Confirmar presença na aula experimental reagendada';
      tasks.push(makeTask(lead, 'Confirmar experimental', secondDate, owner.id, 'Aula experimental reagendada.'));
      return finish();
    }
    effectiveTrialDate = secondDate;
  }

  // realizada
  trial.status = 'Realizada';
  trial.date = effectiveTrialDate;
  trial.levelIdentified = rng.pick(ENGLISH_LEVELS);
  const result = rng.weighted([
    ['Muito interessado', 0.24], ['Interessado', 0.28], ['Pediu proposta', 0.18],
    ['Pediu para pensar', 0.16], ['Sem interesse', 0.09], ['Não respondeu', 0.05],
  ]);
  trial.result = result;
  trial.teacherNotes = teacherNoteFor(result, lead);
  addInteraction('experimental', `Aula experimental realizada — resultado: ${result}`, effectiveTrialDate);
  setStage('experimental_realizada', effectiveTrialDate);
  lead.lastContactDate = effectiveTrialDate;
  cursor = effectiveTrialDate;

  const positive = ['Muito interessado', 'Interessado', 'Pediu proposta'].includes(result);
  if (!positive || !rng.bool(0.78)) {
    lead.nextAction = positive ? 'Enviar proposta comercial' : 'Reengajar / entender objeção';
    lead.nextContactDate = addDaysISO(cursor, rng.int(1, 4));
    if (['Sem interesse', 'Não respondeu'].includes(result)) {
      setStage(rng.bool(0.55) ? 'recuperacao' : 'perdido', cursor);
    } else {
      finalizeOpenLead();
    }
    return finish();
  }

  // ---- proposta -------------------------------------------------------------
  const proposalDate = addDaysISO(cursor, rng.int(0, 3));
  if (stillFuture(proposalDate)) {
    lead.nextContactDate = proposalDate;
    lead.nextAction = 'Enviar proposta comercial';
    tasks.push(makeTask(lead, 'Follow-up de proposta', proposalDate, owner.id, 'Enviar proposta comercial após experimental.'));
    return finish();
  }
  const pkg = rng.pick(packages);
  proposal = {
    id: uid('prp'), leadId: lead.id, date: proposalDate, packageId: pkg.id, packageLabel: pkg.name,
    value: pkg.price, paymentMethod: rng.pick(['Cartão de crédito (mensal)', 'Boleto mensal', 'PIX mensal', 'Cartão à vista (desconto)']),
    specialCondition: rng.bool(0.35) ? rng.pick(['10% de desconto na matrícula', '1ª semana grátis', 'Isenção de taxa de matrícula', 'Desconto para pagamento anual']) : '',
    decisionDate: addDaysISO(proposalDate, 7),
    status: 'Enviada',
  };
  addInteraction('proposta', `Proposta enviada — ${pkg.name} (${brl(pkg.price)}/mês)`, proposalDate);
  setStage('proposta_enviada', proposalDate);
  lead.lastContactDate = proposalDate;
  cursor = proposalDate;

  const proposalOutcome = rng.weighted([
    ['aceita_direto', 0.28], ['negociacao_aceita', 0.16], ['negociacao_recusa', 0.09],
    ['recusada', 0.13], ['sem_resposta', 0.24], ['pendente', 0.10],
  ]);

  if (proposalOutcome === 'pendente') {
    lead.nextAction = 'Fazer follow-up da proposta';
    lead.nextContactDate = addDaysISO(cursor, rng.int(1, 3));
    tasks.push(makeTask(lead, 'Follow-up de proposta', lead.nextContactDate, owner.id, 'Aguardar retorno sobre a proposta enviada.'));
    return finish();
  }

  if (proposalOutcome === 'sem_resposta') {
    const respondDate = addDaysISO(proposalDate, rng.int(5, 10));
    if (stillFuture(respondDate)) {
      lead.nextAction = 'Fazer follow-up da proposta';
      lead.nextContactDate = respondDate;
      tasks.push(makeTask(lead, 'Follow-up de proposta', respondDate, owner.id, 'Sem resposta até agora, tentar novo contato.'));
      return finish();
    }
    proposal.status = 'Sem resposta';
    addInteraction('proposta', 'Lead parou de responder após envio da proposta', respondDate);
    setStage('recuperacao', respondDate);
    lead.lastContactDate = proposalDate;
    lead.nextAction = 'Reengajar lead sem resposta';
    return finish();
  }

  if (proposalOutcome === 'recusada') {
    proposal.status = 'Recusada';
    addInteraction('proposta', 'Lead recusou a proposta', addDaysISO(proposalDate, rng.int(1, 5)));
    setStage(rng.bool(0.5) ? 'perdido' : 'recuperacao', proposalDate);
    lead.lastContactDate = proposalDate;
    lead.nextAction = 'Entender motivo da recusa';
    return finish();
  }

  if (proposalOutcome.startsWith('negociacao')) {
    proposal.status = 'Em negociação';
    const negDate = addDaysISO(proposalDate, rng.int(1, 4));
    addInteraction('etapa', 'Lead pediu condições melhores, negociação em andamento', negDate);
    setStage('negociacao', negDate);
    lead.lastContactDate = negDate;
    cursor = negDate;
    if (proposalOutcome === 'negociacao_recusa') {
      proposal.status = 'Recusada';
      addInteraction('proposta', 'Negociação não avançou, lead desistiu', addDaysISO(negDate, 2));
      setStage(rng.bool(0.5) ? 'perdido' : 'recuperacao', negDate);
      lead.nextAction = 'Reengajar lead';
      return finish();
    }
    cursor = addDaysISO(negDate, rng.int(1, 3));
  }

  // ---- aceita -> matrícula ----------------------------------------------
  proposal.status = 'Aceita';
  const enrollDate = clampToday(addDaysISO(cursor, rng.int(0, 2)));
  addInteraction('proposta', 'Proposta aceita pelo lead', enrollDate);
  student = { id: uid('stu'), leadId: lead.id, name: lead.name, whatsapp: lead.whatsapp, email: lead.email };
  const startDate = addDaysISO(enrollDate, rng.int(1, 10));
  enrollment = {
    id: uid('enr'), leadId: lead.id, studentId: student.id, enrollmentDate: enrollDate, startDate,
    packageId: pkg.id, teacherId: teacher.id, frequency: `${pkg.hoursPerWeek}x por semana`,
    scheduleText: rng.pick(['Seg/Qua/Sex 08:00', 'Ter/Qui 19:00', 'Seg/Qua 07:00', 'Sáb 10:00', 'Ter/Qui/Sáb 18:30']),
    monthlyValue: pkg.price, paymentMethod: proposal.paymentMethod, startingClass: `Turma ${pkg.name} - ${startDate}`,
    notes: '',
  };
  addInteraction('matricula', `Matrícula confirmada — ${pkg.name}, início em ${startDate}`, enrollDate);
  setStage('matriculado', enrollDate);
  lead.lastContactDate = enrollDate;
  lead.nextAction = 'Acompanhar início das aulas';
  lead.nextContactDate = startDate;

  return finish();

  // -- shared tail: for leads still "open" mid-funnel, mark stale ones ------
  function finalizeOpenLead() {
    const stale = daysBetween(TODAY, lead.lastContactDate);
    if (stale > 45 && !['matriculado', 'perdido', 'recuperacao'].includes(lead.status)) {
      if (rng.bool(0.5)) lead.status = 'recuperacao';
    }
  }
  function finish() {
    // A handful of active (open) leads get an explicitly overdue task so
    // the "Tarefas de Hoje" / atrasados views have real content.
    if (!['matriculado', 'perdido'].includes(lead.status) && lead.nextContactDate >= TODAY && rng.bool(0.22)) {
      lead.nextContactDate = addDaysISO(TODAY, -rng.int(1, 5));
    }
    if (!['matriculado', 'perdido'].includes(lead.status)) {
      const type = lead.status === 'recuperacao' ? 'Recuperação'
        : lead.status === 'proposta_enviada' || lead.status === 'negociacao' ? 'Follow-up de proposta'
        : lead.status === 'experimental_agendada' ? 'Confirmar experimental'
        : lead.status === 'novo_lead' ? 'Primeiro contato' : 'Outro';
      if (!tasks.length) {
        tasks.push(makeTask(lead, type, lead.nextContactDate, lead.ownerUserId, lead.nextAction));
      }
    }
    return { lead, interactions, trial, proposal, enrollment, student, tasks };
  }
}

function makeTask(lead, type, dueDate, assignedUserId, note) {
  const isPast = dueDate < TODAY;
  return {
    id: uid('tsk'), leadId: lead.id, title: `${type} — ${lead.name}`, type, dueDate,
    dueTime: randomTime(), assignedUserId, note: note || '',
    status: isPast && rng.bool(0.3) ? 'Concluída' : 'Pendente',
  };
}

function teacherNoteFor(result, lead) {
  const base = {
    'Muito interessado': `Aluno muito engajado, já perguntou sobre valores e turmas. Objetivo: ${lead.objective}.`,
    'Interessado': `Boa aula, aluno demonstrou interesse real em continuar. Nível compatível com a turma sugerida.`,
    'Pediu proposta': `Aula tranquila, aluno pediu para receber a proposta comercial por WhatsApp.`,
    'Pediu para pensar': `Aluno gostou da aula mas quer avaliar outras opções antes de decidir.`,
    'Sem interesse': `Aluno participou mas relatou que o horário/formato não é o ideal no momento.`,
    'Não respondeu': `Aula concluída normalmente, aluno não retornou contato após a aula.`,
  };
  return base[result] || '';
}

function brl(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---------------------------------------------------------------------
// 4) Persist a simulated lead bundle
// ---------------------------------------------------------------------
async function persistLead(bundle) {
  const { lead, interactions, trial, proposal, enrollment, student, tasks } = bundle;
  await run(
    `INSERT INTO leads (id, name, whatsapp, email, entry_date, source_id, campaign_origin, owner_user_id,
       teacher_id, city, age, english_level, objective, notes, status, lost_reason, last_contact_date, next_contact_date,
       next_action, opt_out, last_stage_change_at, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      lead.id, lead.name, lead.whatsapp, lead.email, lead.entryDate, lead.sourceId, lead.campaignOrigin,
      lead.ownerUserId, lead.teacherId, lead.city, lead.age, lead.englishLevel, lead.objective, lead.notes,
      lead.status, lead.lostReason || null, lead.lastContactDate, lead.nextContactDate, lead.nextAction, lead.optOut,
      lead.lastStageChangeAt, isoDateTime(lead.entryDate), nowISO(),
    ]
  );

  for (const i of interactions) {
    await run(`INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)`, [
      i.id, i.leadId, i.type, i.note, i.userId, i.datetime,
    ]);
  }

  if (trial) {
    await run(
      `INSERT INTO trial_classes (id, lead_id, status, date, time, teacher_id, level_identified, objective,
         teacher_notes, result, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        trial.id, trial.leadId, trial.status, trial.date, trial.time, trial.teacherId, trial.levelIdentified,
        trial.objective, trial.teacherNotes, trial.result, nowISO(), nowISO(),
      ]
    );
  }
  if (proposal) {
    await run(
      `INSERT INTO proposals (id, lead_id, date, package_id, package_label, value, payment_method,
         special_condition, decision_date, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        proposal.id, proposal.leadId, proposal.date, proposal.packageId, proposal.packageLabel, proposal.value,
        proposal.paymentMethod, proposal.specialCondition, proposal.decisionDate, proposal.status, nowISO(), nowISO(),
      ]
    );
  }
  if (student) {
    await run(`INSERT INTO students (id, lead_id, name, whatsapp, email, created_at) VALUES (?,?,?,?,?,?)`, [
      student.id, student.leadId, student.name, student.whatsapp, student.email, nowISO(),
    ]);
  }
  if (enrollment) {
    await run(
      `INSERT INTO enrollments (id, lead_id, student_id, enrollment_date, start_date, package_id, teacher_id,
         frequency, schedule_text, monthly_value, payment_method, starting_class, notes, created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        enrollment.id, enrollment.leadId, enrollment.studentId, enrollment.enrollmentDate, enrollment.startDate,
        enrollment.packageId, enrollment.teacherId, enrollment.frequency, enrollment.scheduleText,
        enrollment.monthlyValue, enrollment.paymentMethod, enrollment.startingClass, enrollment.notes, nowISO(),
      ]
    );
  }
  for (const t of tasks) {
    await run(
      `INSERT INTO tasks (id, lead_id, title, type, due_date, due_time, assigned_user_id, note, status, created_at, updated_at, completed_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        t.id, t.leadId, t.title, t.type, t.dueDate, t.dueTime, t.assignedUserId, t.note, t.status,
        nowISO(), nowISO(), t.status === 'Concluída' ? nowISO() : null,
      ]
    );
  }
}

// ---------------------------------------------------------------------
// 5) Campaigns: built from leads already sitting in recovery-like states
// ---------------------------------------------------------------------
async function seedCampaigns(ctx, leads) {
  const { users } = ctx;
  const manager = users.find((u) => u.role === 'manager');
  const now = nowISO();

  const campaignDefs = [
    {
      name: 'Campanha Recuperação Setembro',
      targetDescription: 'Leads com experimental realizada, sem matrícula, 15-60 dias sem contato',
      daysAgo: 5,
      channel: 'WhatsApp',
      message: 'Oi {{nome}}! Notamos que você fez sua aula experimental com a gente e queremos saber se ainda tem interesse em continuar aprendendo inglês. Temos uma condição especial essa semana.',
      filter: (l) => ['recuperacao', 'experimental_realizada'].includes(l.status) && daysBetween(TODAY, l.lastContactDate) >= 15,
    },
    {
      name: 'Reativação Propostas em Aberto',
      targetDescription: 'Leads com proposta enviada sem resposta',
      daysAgo: 18,
      channel: 'WhatsApp',
      message: 'Olá {{nome}}, tudo bem? Ainda temos sua proposta guardada aqui — posso tirar alguma dúvida ou ajustar as condições para fechar essa semana?',
      filter: (l) => l.status === 'recuperacao' && (l.lastAction || '').includes(''),
    },
    {
      name: 'Volta às Aulas - Leads Antigos',
      targetDescription: 'Leads perdidos ou sem contato há mais de 90 dias',
      daysAgo: 40,
      channel: 'E-mail',
      message: 'Sentimos sua falta! Temos novas turmas abrindo e uma condição especial de volta às aulas para quem já conhece a Upfront.',
      filter: (l) => daysBetween(TODAY, l.lastContactDate) >= 90,
    },
    {
      name: 'Reengajamento Instagram',
      targetDescription: 'Leads vindos do Instagram sem conversão, 7-30 dias sem contato',
      daysAgo: 8,
      channel: 'WhatsApp',
      message: 'Oi {{nome}}! Vimos seu interesse em aprender inglês pelo Instagram. Que tal agendar uma aula experimental gratuita essa semana?',
      filter: (l, sourceName) => sourceName(l) === 'Instagram' && daysBetween(TODAY, l.lastContactDate) >= 7 && !['matriculado'].includes(l.status),
    },
  ];

  const sourceById = Object.fromEntries(ctx.sources.map((s) => [s.id, s.name]));
  const sourceName = (l) => sourceById[l.sourceId];

  for (const def of campaignDefs) {
    const eligible = leads.filter((l) => l.optOut !== 1 && def.filter(l, sourceName));
    const targets = rng.pickN(eligible, Math.min(eligible.length, rng.int(12, 35)));
    if (!targets.length) continue;

    const campaignId = uid('cmp');
    const campaignDate = addDaysISO(TODAY, -def.daysAgo);
    await run(
      `INSERT INTO campaigns (id, name, target_description, date, message, channel, responsible_user_id, filters_json, status, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [campaignId, def.name, def.targetDescription, campaignDate, def.message, def.channel, manager.id,
        JSON.stringify({ auto: true }), 'Concluída', now, now]
    );

    for (const lead of targets) {
      const outcome = rng.weighted([
        ['nada', 0.42], ['respondeu', 0.24], ['interesse', 0.16], ['agendou', 0.1], ['matriculou', 0.08],
      ]);
      const responded = outcome !== 'nada' ? 1 : 0;
      const interested = ['interesse', 'agendou', 'matriculou'].includes(outcome) ? 1 : 0;
      const scheduled = ['agendou', 'matriculou'].includes(outcome) ? 1 : 0;
      const enrolled = outcome === 'matriculou' ? 1 : 0;
      await run(
        `INSERT INTO campaign_recipients (id, campaign_id, lead_id, sent_status, responded, interested, scheduled_trial, enrolled, responded_at, created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [uid('crc'), campaignId, lead.id, 'Enviado', responded, interested, scheduled, enrolled,
          responded ? isoDateTime(addDaysISO(campaignDate, rng.int(0, 5))) : null, now]
      );
      if (enrolled && lead.status !== 'matriculado') {
        await run(`UPDATE leads SET status='recuperacao' WHERE id=?`, [lead.id]);
        await run(
          `INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)`,
          [uid('int'), lead.id, 'campanha', `Lead recuperado através da campanha "${def.name}"`, manager.id, isoDateTime(addDaysISO(campaignDate, 3))]
        );
      } else if (responded) {
        await run(
          `INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)`,
          [uid('int'), lead.id, 'campanha', `Respondeu à campanha "${def.name}"`, manager.id, isoDateTime(addDaysISO(campaignDate, rng.int(0, 4)))]
        );
      }
    }
  }
}

async function seedSegments() {
  const now = nowISO();
  const defs = [
    { name: 'Experimental realizada + não matriculado', description: 'Fez a aula experimental mas ainda não fechou matrícula', filters: { status: ['experimental_realizada', 'recuperacao'], hadTrial: true, enrolled: false } },
    { name: 'Proposta enviada + sem resposta', description: 'Recebeu proposta e parou de responder', filters: { status: ['proposta_enviada', 'negociacao', 'recuperacao'], proposalStatus: 'Sem resposta' } },
    { name: 'Leads antigos', description: 'Sem contato há mais de 90 dias', filters: { daysSinceContactMin: 90 } },
    { name: 'Interessados em inglês para trabalho', description: 'Objetivo: trabalho/carreira', filters: { objective: 'Trabalho / Carreira' } },
    { name: 'Interessados em viagens', description: 'Objetivo: viagem', filters: { objective: 'Viagem' } },
    { name: 'Querem conversação', description: 'Objetivo: conversação', filters: { objective: 'Conversação' } },
    { name: 'Vindos do Instagram', description: 'Origem: Instagram', filters: { sourceName: 'Instagram' } },
    { name: 'Vindos de indicação', description: 'Origem: Indicação', filters: { sourceName: 'Indicação' } },
  ];
  for (const d of defs) {
    await run(
      `INSERT INTO segments (id, name, description, filters_json, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
      [uid('seg'), d.name, d.description, JSON.stringify(d.filters), now, now]
    );
  }
}

// ---------------------------------------------------------------------
// main
// ---------------------------------------------------------------------
export async function main() {
  console.log('Seeding Upfront CRM demo database…');
  await transaction(async () => {
    await wipe();
    const ctx = await seedReferenceData();
    const LEAD_COUNT = 165;
    const leadsForCampaigns = [];
    for (let i = 0; i < LEAD_COUNT; i++) {
      const bundle = simulateLead(ctx);
      await persistLead(bundle);
      leadsForCampaigns.push(bundle.lead);
    }
    await seedCampaigns(ctx, leadsForCampaigns);
    await seedSegments();
  });

  const counts = {};
  for (const t of ['users', 'teachers', 'sources', 'packages', 'tags', 'leads', 'students', 'interactions', 'tasks', 'trial_classes', 'proposals', 'enrollments', 'campaigns', 'campaign_recipients', 'segments']) {
    const row = (await all(`SELECT COUNT(*) as n FROM ${t}`))[0];
    counts[t] = row.n;
  }
  console.log('Seed concluído:', counts);
  console.log('\nLogin de demonstração (senha para todos: upfront123):');
  for (const row of await all('SELECT username, role FROM users ORDER BY role')) {
    console.log(`  ${row.username}  (${row.role})`);
  }
}

// Only auto-run when executed directly (`node seed.js` / `npm run seed`) —
// index.js imports { main } and awaits it itself on first boot instead of
// relying on this side effect, since a dynamic import already runs the
// module body once.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); });
}
