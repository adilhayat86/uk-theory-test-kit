#!/usr/bin/env node
/**
 * Human editorial release gate. Draft authoring and an attached URL do NOT
 * constitute independent approval. Run without --report-only to enforce.
 */
const fs = require('node:fs');
const path = require('node:path');
const { loadBank } = require('./check-mvp-content.cjs');

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (quoted) throw new Error('Malformed review CSV: unclosed quote');
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function evaluateReviews(bank, records) {
  const issues = [];
  const byId = new Map(bank.map((q) => [q.id, q]));
  const seen = new Set();
  let approved = 0;
  for (const row of records) {
    if (!row.question_id || seen.has(row.question_id)) {
      issues.push('Missing or duplicate review row: ' + row.question_id);
      continue;
    }
    seen.add(row.question_id);
    const question = byId.get(row.question_id);
    if (!question) {
      issues.push('Review row not in bank: ' + row.question_id);
      continue;
    }
    const metadataMatches = row.topic === question.topic &&
      row.reference === question.reference &&
      row.primary_source_url === question.sourceUrl;
    if (!metadataMatches) issues.push('Review metadata out of sync: ' + row.question_id);
    const reviewed = row.review_status === 'APPROVED' &&
      typeof row.reviewer === 'string' && row.reviewer.trim().length > 0 &&
      /^\d{4}-\d{2}-\d{2}$/.test(row.review_date || '') &&
      Number.isFinite(Date.parse(row.review_date));
    if (!reviewed) issues.push('Editorial approval pending: ' + row.question_id);
    if (reviewed && metadataMatches) approved += 1;
  }
  for (const id of byId.keys()) if (!seen.has(id)) issues.push('No review row for: ' + id);
  return { total: bank.length, approved, ready: approved === bank.length && issues.length === 0, issues };
}

function main() {
  const root = path.resolve(__dirname, '..');
  const bank = loadBank(path.join(root, 'src/data/questions.ts'));
  const rows = parseCsv(fs.readFileSync(path.join(root, 'docs/QUESTION_REVIEW_TRACKER.csv'), 'utf8'));
  const headers = rows.shift();
  if (!headers || !headers.includes('review_status') || !headers.includes('question_id')) {
    throw new Error('Missing required review CSV headers');
  }
  const records = rows.map((row) => Object.fromEntries(headers.map((heading, i) => [heading, row[i] ?? ''])));
  const result = evaluateReviews(bank, records);
  console.log('Independent editorial gate: ' + (result.ready ? 'APPROVED' : 'NOT READY'));
  console.log('Approved: ' + result.approved + '/' + result.total + '; unresolved: ' + result.issues.length);
  result.issues.filter((issue) => !issue.startsWith('Editorial approval pending')).slice(0, 30)
    .forEach((issue) => console.log(' - ' + issue));
  console.log('A source URL and structural test are not a substitute for a named human reviewer.');
  if (!result.ready && !process.argv.includes('--report-only')) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { parseCsv, evaluateReviews };
