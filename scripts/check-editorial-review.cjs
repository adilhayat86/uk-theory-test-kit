#!/usr/bin/env node
/**
 * Human editorial release gate. Draft authoring and an attached URL do NOT
 * constitute independent approval. Run without --report-only to enforce.
 */
const fs = require('node:fs');
const path = require('node:path');
const { buildCatalogue, questionContentHash, TRACKERS } = require('./review-content.cjs');

function parseCsv(text) {
  text = text.replace(/^\uFEFF/, '');
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

function validReviewDate(value, today) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const timestamp = Date.parse(value + 'T00:00:00.000Z');
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value && value <= today;
}

function evaluateReviewEntries(entries, records, { idColumn = 'content_id', today = new Date().toISOString().slice(0, 10) } = {}) {
  const issues = [];
  const byId = new Map();
  for (const entry of entries) {
    if (!entry.id || byId.has(entry.id)) issues.push('Missing or duplicate content identity: ' + entry.id);
    byId.set(entry.id, entry);
  }
  const seen = new Set();
  let approved = 0;
  for (const row of records) {
    const id = row[idColumn];
    if (!id || seen.has(id)) {
      issues.push('Missing or duplicate review row: ' + id);
      continue;
    }
    seen.add(id);
    const entry = byId.get(id);
    if (!entry) {
      issues.push('Review row not in current content: ' + id);
      continue;
    }
    const metadataMatches = entry.kind === 'question'
      ? row.topic === entry.metadata.topic && row.reference === entry.metadata.reference &&
        row.primary_source_url === entry.metadata.primary_source_url
      : row.content_kind === entry.kind && row.title === entry.title;
    if (!metadataMatches) issues.push('Review metadata out of sync: ' + id);
    const hashMatches = /^[a-f0-9]{64}$/.test(row.content_sha256 || '') && row.content_sha256 === entry.content_sha256;
    if (!hashMatches) issues.push('Review content hash missing or stale: ' + id);
    const reviewed = row.review_status === 'APPROVED' &&
      typeof row.reviewer === 'string' && row.reviewer.trim().length > 0 &&
      validReviewDate(row.review_date, today);
    if (!reviewed) issues.push('Editorial approval pending: ' + id);
    if (reviewed && metadataMatches && hashMatches) approved += 1;
  }
  for (const id of byId.keys()) if (!seen.has(id)) issues.push('No review row for: ' + id);
  return { total: entries.length, approved, ready: entries.length > 0 && approved === entries.length && issues.length === 0, issues };
}

/** Backwards-compatible question-only API; the CLI supplies full linked-media fingerprints. */
function evaluateReviews(bank, records, options = {}) {
  const entries = bank.map(question => ({
    kind: 'question', id: question.id, title: question.prompt,
    content_sha256: options.hashes ? options.hashes.get(question.id) : questionContentHash(question),
    metadata: { topic: question.topic, reference: question.reference, primary_source_url: question.sourceUrl },
  }));
  return evaluateReviewEntries(entries, records, { ...options, idColumn: 'question_id' });
}

function readReviewRecords(file, requiredHeaders) {
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  const headers = rows.shift();
  if (!headers || new Set(headers).size !== headers.length || requiredHeaders.some(header => !headers.includes(header))) {
    throw new Error('Missing or duplicate review CSV headers in ' + path.basename(file));
  }
  return rows.map((row, index) => {
    if (row.length !== headers.length) throw new Error(`Review CSV column count mismatch in ${path.basename(file)} row ${index + 2}`);
    return Object.fromEntries(headers.map((heading, i) => [heading, row[i]]));
  });
}

function evaluateCatalogue(catalogue, directory, options = {}) {
  const results = TRACKERS.map(tracker => {
    const required = [tracker.idColumn, 'content_sha256', 'review_status', 'reviewer', 'review_date'];
    const records = readReviewRecords(path.join(directory, tracker.file), required);
    const entries = catalogue.entries.filter(entry => entry.kind === tracker.kind);
    return { kind: tracker.kind, file: tracker.file,
      ...evaluateReviewEntries(entries, records, { ...options, idColumn: tracker.idColumn }) };
  });
  return { ready: results.every(result => result.ready), total: results.reduce((sum, result) => sum + result.total, 0),
    approved: results.reduce((sum, result) => sum + result.approved, 0), results };
}

function main() {
  const root = path.resolve(__dirname, '..');
  const catalogue = buildCatalogue(root);
  const result = evaluateCatalogue(catalogue, path.join(root, 'docs'));
  console.log('Independent editorial gate: ' + (result.ready ? 'APPROVED' : 'NOT READY'));
  for (const group of result.results) {
    console.log(`${group.kind}: ${group.approved}/${group.total} approved; unresolved: ${group.issues.length}`);
    group.issues.filter(issue => !issue.startsWith('Editorial approval pending')).slice(0, 12)
      .forEach(issue => console.log(' - ' + issue));
  }
  console.log('Content catalogue SHA-256: ' + catalogue.catalogue_sha256);
  console.log('Approval is bound to current text, answers, mappings and actual media bytes.');
  console.log('Hashes and a named review record are evidence controls, not proof that a human review occurred.');
  if (!result.ready && !process.argv.includes('--report-only')) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { parseCsv, validReviewDate, evaluateReviews, evaluateReviewEntries, readReviewRecords, evaluateCatalogue };
