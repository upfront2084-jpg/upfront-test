// Shared WHERE-clause builder for leads. Used by the leads list endpoint,
// the recovery module, segment evaluation and campaign audience preview,
// so every part of the app agrees on what "a lead matching these filters"
// means.
import { all as dbAll, one as dbOne } from '../db.js';
import { todayISO } from './util.js';

const BASE_SELECT = `
  SELECT leads.*, sources.name as source_name, sources.icon as source_icon,
         owner.name as owner_name, teachers.name as teacher_name,
         (SELECT status FROM proposals p WHERE p.lead_id = leads.id ORDER BY p.date DESC LIMIT 1) as last_proposal_status,
         (SELECT COUNT(*) FROM trial_classes t WHERE t.lead_id = leads.id AND t.status = 'Realizada') as trials_done,
         (SELECT MAX(cr.created_at) FROM campaign_recipients cr WHERE cr.lead_id = leads.id) as last_campaign_at,
         (SELECT c.id FROM campaign_recipients cr JOIN campaigns c ON c.id = cr.campaign_id WHERE cr.lead_id = leads.id ORDER BY cr.created_at DESC LIMIT 1) as last_campaign_id
  FROM leads
  LEFT JOIN sources ON sources.id = leads.source_id
  LEFT JOIN users owner ON owner.id = leads.owner_user_id
  LEFT JOIN teachers ON teachers.id = leads.teacher_id
`;

export function buildLeadWhere(filters = {}) {
  const clauses = [];
  const params = [];

  if (filters.status?.length) {
    clauses.push(`leads.status IN (${filters.status.map(() => '?').join(',')})`);
    params.push(...filters.status);
  }
  if (filters.excludeStatus?.length) {
    clauses.push(`leads.status NOT IN (${filters.excludeStatus.map(() => '?').join(',')})`);
    params.push(...filters.excludeStatus);
  }
  if (filters.sourceId) {
    clauses.push('leads.source_id = ?');
    params.push(filters.sourceId);
  }
  if (filters.sourceName) {
    clauses.push('sources.name = ?');
    params.push(filters.sourceName);
  }
  if (filters.ownerUserId) {
    clauses.push('leads.owner_user_id = ?');
    params.push(filters.ownerUserId);
  }
  if (filters.teacherId) {
    clauses.push('leads.teacher_id = ?');
    params.push(filters.teacherId);
  }
  if (filters.objective) {
    clauses.push('leads.objective = ?');
    params.push(filters.objective);
  }
  if (filters.englishLevel) {
    clauses.push('leads.english_level = ?');
    params.push(filters.englishLevel);
  }
  if (filters.city) {
    clauses.push('leads.city LIKE ?');
    params.push(`%${filters.city}%`);
  }
  if (filters.entryDateFrom) {
    clauses.push('leads.entry_date >= ?');
    params.push(filters.entryDateFrom);
  }
  if (filters.entryDateTo) {
    clauses.push('leads.entry_date <= ?');
    params.push(filters.entryDateTo);
  }
  if (filters.daysSinceContactMin !== undefined && filters.daysSinceContactMin !== null) {
    clauses.push(`DATEDIFF(?, leads.last_contact_date) >= ?`);
    params.push(todayISO(), filters.daysSinceContactMin);
  }
  if (filters.daysSinceContactMax !== undefined && filters.daysSinceContactMax !== null && isFinite(filters.daysSinceContactMax)) {
    clauses.push(`DATEDIFF(?, leads.last_contact_date) <= ?`);
    params.push(todayISO(), filters.daysSinceContactMax);
  }
  if (filters.hadTrial) {
    clauses.push(`EXISTS (SELECT 1 FROM trial_classes t WHERE t.lead_id = leads.id AND t.status = 'Realizada')`);
  }
  if (filters.notEnrolled) {
    clauses.push(`leads.status != 'matriculado'`);
  }
  if (filters.proposalStatus) {
    clauses.push(
      `EXISTS (SELECT 1 FROM proposals p WHERE p.lead_id = leads.id AND p.status = ? AND p.id = (SELECT id FROM proposals p2 WHERE p2.lead_id = leads.id ORDER BY p2.date DESC LIMIT 1))`
    );
    params.push(filters.proposalStatus);
  }
  if (filters.tagId) {
    clauses.push(`EXISTS (SELECT 1 FROM lead_tags lt WHERE lt.lead_id = leads.id AND lt.tag_id = ?)`);
    params.push(filters.tagId);
  }
  if (filters.lastCampaignId) {
    clauses.push(`EXISTS (SELECT 1 FROM campaign_recipients cr WHERE cr.lead_id = leads.id AND cr.campaign_id = ?)`);
    params.push(filters.lastCampaignId);
  }
  if (filters.excludeOptOut) {
    clauses.push('leads.opt_out = 0');
  }
  if (filters.search) {
    clauses.push('(leads.name LIKE ? OR leads.whatsapp LIKE ? OR leads.email LIKE ? OR leads.id LIKE ?)');
    const s = `%${filters.search}%`;
    params.push(s, s, s, s);
  }
  if (filters.ids?.length) {
    clauses.push(`leads.id IN (${filters.ids.map(() => '?').join(',')})`);
    params.push(...filters.ids);
  }

  return { where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', params };
}

export async function queryLeads(filters = {}, { orderBy = 'leads.entry_date DESC', limit, offset } = {}) {
  const { where, params } = buildLeadWhere(filters);
  let sql = `${BASE_SELECT} ${where} ORDER BY ${orderBy}`;
  const finalParams = [...params];
  if (limit) {
    sql += ' LIMIT ? OFFSET ?';
    finalParams.push(limit, offset || 0);
  }
  return dbAll(sql, finalParams);
}

export async function countLeads(filters = {}) {
  const { where, params } = buildLeadWhere(filters);
  const sql = `SELECT COUNT(*) as n FROM leads LEFT JOIN sources ON sources.id = leads.source_id ${where}`;
  const row = await dbOne(sql, params);
  return row.n;
}

// Recovery-specific eligibility: a lead is a recovery candidate when it did
// a trial without enrolling, got a proposal without closing, stopped
// responding, was marked lost, or has simply gone quiet for a while.
export function recoveryEligibleFilters(extra = {}) {
  return { excludeStatus: ['matriculado'], excludeOptOut: true, ...extra };
}
