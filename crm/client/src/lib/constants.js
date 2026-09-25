export const ROLE_LABELS = {
  admin: 'Administrador',
  manager: 'Gestor',
  agent: 'Atendente',
  teacher: 'Professor',
};

export const STAGES = [
  { key: 'novo_lead', label: 'Novo Lead', color: '#6C7BFA' },
  { key: 'primeiro_contato', label: 'Primeiro Contato', color: '#5B93FF' },
  { key: 'em_conversa', label: 'Em Conversa', color: '#2F6FED' },
  { key: 'experimental_agendada', label: 'Experimental Agendada', color: '#F5A524' },
  { key: 'experimental_realizada', label: 'Experimental Realizada', color: '#EA8C00' },
  { key: 'proposta_enviada', label: 'Proposta Enviada', color: '#8B5CF6' },
  { key: 'negociacao', label: 'Negociação', color: '#C026D3' },
  { key: 'matriculado', label: 'Matriculado', color: '#16A34A' },
  { key: 'perdido', label: 'Perdido', color: '#E1425B' },
  { key: 'recuperacao', label: 'Recuperação', color: '#0EA5A4' },
];
export const STAGE_MAP = Object.fromEntries(STAGES.map((s) => [s.key, s]));
export const STAGE_KEYS = STAGES.map((s) => s.key);

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
export const CAMPAIGN_CHANNELS = ['WhatsApp', 'E-mail', 'SMS', 'Ligação'];

export const LOST_REASONS = [
  { key: 'financeiro', label: 'Financeiro (preço/condição)' },
  { key: 'nao_respondeu', label: 'Não respondeu / sumiu' },
  { key: 'metodologia', label: 'Não gostou da metodologia/sistema' },
  { key: 'concorrencia', label: 'Foi para outra escola' },
  { key: 'sem_tempo', label: 'Sem tempo / não é prioridade agora' },
  { key: 'horario', label: 'Incompatibilidade de horário' },
  { key: 'outro', label: 'Outro' },
];
export const LOST_REASON_LABELS = Object.fromEntries(LOST_REASONS.map((r) => [r.key, r.label]));

export const RECOVERY_BUCKETS = [
  { key: '7', label: '7 dias' },
  { key: '15', label: '15 dias' },
  { key: '30', label: '30 dias' },
  { key: '60', label: '60 dias' },
  { key: '90', label: '90 dias' },
  { key: '180', label: '180 dias' },
  { key: '180+', label: 'Mais de 180 dias' },
];

export const INTERACTION_ICONS = {
  criacao: 'star',
  contato: 'phone',
  etapa: 'shuffle',
  experimental: 'graduation-cap',
  proposta: 'file-text',
  matricula: 'award',
  nota: 'edit',
  campanha: 'send',
  tarefa: 'check-circle',
  sistema: 'sliders',
};

export const REPORT_TYPES = [
  { key: 'leads-por-periodo', label: 'Leads por período' },
  { key: 'leads-por-origem', label: 'Leads por origem' },
  { key: 'conversao-por-origem', label: 'Conversão por origem' },
  { key: 'experimentais', label: 'Aulas experimentais' },
  { key: 'matriculas', label: 'Matrículas' },
  { key: 'leads-perdidos', label: 'Leads perdidos' },
  { key: 'leads-recuperados', label: 'Leads recuperados' },
  { key: 'taxa-recuperacao', label: 'Taxa de recuperação' },
  { key: 'tempo-medio-matricula', label: 'Tempo médio até matrícula' },
  { key: 'conversao-experimental-matricula', label: 'Conversão experimental → matrícula' },
  { key: 'conversao-lead-matricula', label: 'Conversão lead → matrícula' },
];
