export const ROLES = ['admin', 'manager', 'agent', 'teacher'];

export const ROLE_LABELS = {
  admin: 'Administrador',
  manager: 'Gestor',
  agent: 'Atendente',
  teacher: 'Professor',
};

export const STAGES = [
  { key: 'novo_lead', label: 'Novo Lead' },
  { key: 'primeiro_contato', label: 'Primeiro Contato' },
  { key: 'em_conversa', label: 'Em Conversa' },
  { key: 'experimental_agendada', label: 'Aula Experimental Agendada' },
  { key: 'experimental_realizada', label: 'Aula Experimental Realizada' },
  { key: 'proposta_enviada', label: 'Proposta Enviada' },
  { key: 'negociacao', label: 'Negociação' },
  { key: 'matriculado', label: 'Matriculado' },
  { key: 'perdido', label: 'Perdido' },
  { key: 'recuperacao', label: 'Recuperação' },
];
export const STAGE_KEYS = STAGES.map((s) => s.key);
export const STAGE_LABELS = Object.fromEntries(STAGES.map((s) => [s.key, s.label]));
export const CLOSED_STAGES = ['matriculado', 'perdido'];

export const LOST_REASONS = [
  { key: 'financeiro', label: 'Financeiro (preço/condição)' },
  { key: 'nao_respondeu', label: 'Não respondeu / sumiu' },
  { key: 'metodologia', label: 'Não gostou da metodologia/sistema' },
  { key: 'concorrencia', label: 'Foi para outra escola' },
  { key: 'sem_tempo', label: 'Sem tempo / não é prioridade agora' },
  { key: 'horario', label: 'Incompatibilidade de horário' },
  { key: 'outro', label: 'Outro' },
];
export const LOST_REASON_KEYS = LOST_REASONS.map((r) => r.key);
export const LOST_REASON_LABELS = Object.fromEntries(LOST_REASONS.map((r) => [r.key, r.label]));

export const TRIAL_STATUS = ['Não agendada', 'Agendada', 'Realizada', 'Faltou', 'Reagendada', 'Cancelada'];
export const TRIAL_RESULT = [
  'Interessado',
  'Muito interessado',
  'Pediu proposta',
  'Pediu para pensar',
  'Sem interesse',
  'Não respondeu',
];
export const PROPOSAL_STATUS = ['Enviada', 'Visualizada', 'Em negociação', 'Aceita', 'Recusada', 'Sem resposta'];
export const ENGLISH_LEVELS = ['Iniciante', 'Básico', 'Pré-Intermediário', 'Intermediário', 'Avançado', 'Fluente'];
export const OBJECTIVES = [
  'Viagem',
  'Trabalho / Carreira',
  'Conversação',
  'Intercâmbio',
  'Proficiência (exames)',
  'Uso acadêmico',
  'Hobby / Cultura',
];
export const TASK_TYPES = ['Primeiro contato', 'Confirmar experimental', 'Follow-up de proposta', 'Recuperação', 'Outro'];
export const TASK_STATUS = ['Pendente', 'Concluída', 'Cancelada'];
export const CAMPAIGN_CHANNELS = ['WhatsApp', 'E-mail', 'SMS', 'Ligação'];
export const CAMPAIGN_STATUS = ['Rascunho', 'Enviada', 'Em andamento', 'Concluída'];
export const DEFAULT_SOURCES = [
  { name: 'Instagram' },
  { name: 'Facebook' },
  { name: 'Google' },
  { name: 'TikTok' },
  { name: 'YouTube' },
  { name: 'Indicação' },
  { name: 'Site' },
  { name: 'WhatsApp' },
  { name: 'Outros' },
];
export const RECOVERY_BUCKETS = [
  { key: '7', label: '7 dias', min: 7, max: 14 },
  { key: '15', label: '15 dias', min: 15, max: 29 },
  { key: '30', label: '30 dias', min: 30, max: 59 },
  { key: '60', label: '60 dias', min: 60, max: 89 },
  { key: '90', label: '90 dias', min: 90, max: 179 },
  { key: '180', label: '180 dias', min: 180, max: 180 },
  { key: '180+', label: 'Mais de 180 dias', min: 181, max: Infinity },
];
