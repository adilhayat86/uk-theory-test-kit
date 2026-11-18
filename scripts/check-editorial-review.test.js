const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { parseCsv, validReviewDate, evaluateReviews, evaluateReviewEntries, readReviewRecords, evaluateCatalogue } = require('./check-editorial-review.cjs');
const { questionContentHash, hashContent, buildCatalogue, TRACKERS } = require('./review-content.cjs');
const { csv, refreshRecords } = require('./export-editorial-review.cjs');

const today = '2026-11-18';
const question = {
  id: 'fixture-question', topic: 'Road rules', difficulty: 'standard',
  prompt: 'Which fixture answer is supported by this original example?',
  options: ['First option', 'Second option', 'Third option', 'Fourth option'], correctIndex: 1,
  explanation: 'This fixture explanation identifies the original second option.',
  reference: 'Highway Code, fixture rule', sourceUrl: 'https://www.gov.uk/example',
};
const review = (value = question) => ({
  question_id: value.id, topic: value.topic, reference: value.reference, primary_source_url: value.sourceUrl,
  content_sha256: questionContentHash(value), review_status: 'APPROVED',
  reviewer: 'Independent fixture reviewer', review_date: '2026-11-17', notes: 'Fixture only; never a real content approval.',
});

test('a named, dated approval for exactly matching current question content is accepted', () => {
  expect(evaluateReviews([question], [review()], { today })).toEqual({ total: 1, approved: 1, ready: true, issues: [] });
});

test.each([
  ['prompt', 'A changed prompt that needs another human decision'],
  ['options', ['First option changed', 'Second option', 'Third option', 'Fourth option']],
  ['correctIndex', 3],
  ['explanation', 'A different explanation changes the interpretation of this answer.'],
  ['reference', 'Highway Code, another rule'],
  ['sourceUrl', 'https://www.gov.uk/another-source'],
  ['imageAssetId', 'different-image'],
  ['caseStudyVideoAssetId', 'different-video'],
])('changing %s invalidates previously recorded approval even with the same question ID', (key, value) => {
  const result = evaluateReviews([{ ...question, [key]: value }], [review()], { today });
  expect(result.ready).toBe(false);
  expect(result.approved).toBe(0);
  expect(result.issues).toContain('Review content hash missing or stale: fixture-question');
});

test('legacy approved rows without a content fingerprint cannot approve the current bank', () => {
  const row = review();
  delete row.content_sha256;
  expect(evaluateReviews([question], [row], { today }).ready).toBe(false);
});

test('an explicitly supplied linked-media hash map cannot silently fall back to text-only approval for missing entries', () => {
  expect(evaluateReviews([question], [review()], { today, hashes: new Map() }).ready).toBe(false);
});

test('duplicate, missing and obsolete review records cannot turn partial coverage into readiness', () => {
  expect(evaluateReviews([question], [review(), review()], { today }).ready).toBe(false);
  expect(evaluateReviews([question], [], { today }).issues).toContain('No review row for: fixture-question');
  expect(evaluateReviews([question], [{ ...review(), question_id: 'removed' }], { today }).ready).toBe(false);
  expect(evaluateReviews([], [], { today }).ready).toBe(false);
});

test.each([
  ['PENDING_INDEPENDENT_REVIEW', 'Reviewer', '2026-11-17'],
  ['NEEDS_CHANGES', 'Reviewer', '2026-11-17'],
  ['APPROVED', '   ', '2026-11-17'],
  ['APPROVED', 'Reviewer', '2026-02-31'],
  ['APPROVED', 'Reviewer', '2026-11-19'],
])('status %s, reviewer %s and date %s do not create a valid current approval', (review_status, reviewer, review_date) => {
  expect(evaluateReviews([question], [{ ...review(), review_status, reviewer, review_date }], { today }).ready).toBe(false);
});

test('review dates use real calendar dates, UTC and no future-dated approval', () => {
  expect(validReviewDate('2024-02-29', today)).toBe(true);
  for (const value of ['2025-02-29', '2026-02-31', '2026-11-19', '2026-1-01', 'invalid']) expect(validReviewDate(value, today)).toBe(false);
});

test('non-question content requires matching kind, title and fingerprint as well as a named approval', () => {
  const entry = { id: 'a-video', kind: 'video', title: 'Fixture video', content_sha256: hashContent({ bytes: 'one' }) };
  const row = { content_id: entry.id, content_kind: entry.kind, title: entry.title, content_sha256: entry.content_sha256,
    review_status: 'APPROVED', reviewer: 'Fixture reviewer', review_date: '2026-11-17' };
  expect(evaluateReviewEntries([entry], [row], { today }).ready).toBe(true);
  expect(evaluateReviewEntries([{ ...entry, content_sha256: hashContent({ bytes: 'two' }) }], [row], { today }).ready).toBe(false);
  expect(evaluateReviewEntries([entry], [{ ...row, content_kind: 'image' }], { today }).ready).toBe(false);
});

test('refresh preserves an unchanged decision and comments but removes approval after content changes', () => {
  const tracker = TRACKERS.find(value => value.kind === 'question');
  const entry = { kind: 'question', id: question.id, title: question.prompt, content_sha256: questionContentHash(question),
    metadata: { topic: question.topic, reference: question.reference, primary_source_url: question.sourceUrl } };
  expect(refreshRecords([entry], [review()], tracker)[0]).toEqual(review());
  const changed = refreshRecords([{ ...entry, content_sha256: 'a'.repeat(64) }], [review()], tracker)[0];
  expect(changed.review_status).toBe('PENDING_INDEPENDENT_REVIEW');
  expect(changed.reviewer).toBe('');
  expect(changed.review_date).toBe('');
  expect(changed.notes).toContain('Fixture only');
  expect(changed.notes).toContain('Previous approval');
  expect(refreshRecords([entry], [], tracker)[0].review_status).toBe('PENDING_INDEPENDENT_REVIEW');
  expect(() => refreshRecords([entry], [review(), { ...review(), review_status: 'NEEDS_CHANGES' }], tracker)).toThrow(/duplicate review identity/);
});

test('CSV round-trips quoted commas, quotes and newlines with an optional spreadsheet BOM', () => {
  const headers = ['id', 'notes'];
  const rows = [{ id: 'one', notes: 'A, B and "C"\nAnother line' }];
  expect(parseCsv('\uFEFF' + csv(headers, rows))).toEqual([headers, ['one', rows[0].notes]]);
  expect(() => parseCsv('id,notes\none,"unclosed')).toThrow(/unclosed quote/);
});

test('CSV input rejects duplicate headers and truncated reviewer rows', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'theorykit-review-csv-'));
  try {
    const file = path.join(directory, 'review.csv');
    fs.writeFileSync(file, 'id,id\none,two\n');
    expect(() => readReviewRecords(file, ['id'])).toThrow(/duplicate review CSV headers/);
    fs.writeFileSync(file, 'id,notes\none\n');
    expect(() => readReviewRecords(file, ['id'])).toThrow(/column count mismatch/);
  } finally {
    const resolved = path.resolve(directory);
    if (!resolved.startsWith(path.join(path.resolve(os.tmpdir()), 'theorykit-review-csv-'))) throw new Error('Unexpected fixture directory');
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});

test('the real Android review scope covers questions, lessons, all learner presentations, videos and sign notes without inventing approvals', () => {
  const root = path.resolve(__dirname, '..');
  const catalogue = buildCatalogue(root);
  expect(catalogue.counts).toEqual({ question: 309, lesson: 38, video: 3, image: 91, 'sign-note': 30 });
  for (const entry of catalogue.entries) expect(hashContent(entry.content)).toBe(entry.content_sha256);
  const result = evaluateCatalogue(catalogue, path.join(root, 'docs'), { today });
  expect(result.total).toBe(471);
  expect(result.approved).toBe(0);
  expect(result.ready).toBe(false);
  expect(result.results.every(group => group.issues.every(issue => issue.startsWith('Editorial approval pending:')))).toBe(true);
});

test.each([[[], 1], [['--report-only'], 0]])('CLI arguments %j preserve strict versus report-only behavior for all pending categories', (args, status) => {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'check-editorial-review.cjs'), ...args],
    { encoding: 'utf8', windowsHide: true });
  expect(result.status).toBe(status);
  expect(result.stdout).toContain('Independent editorial gate: NOT READY');
  for (const value of ['question: 0/309', 'lesson: 0/38', 'video: 0/3', 'image: 0/91', 'sign-note: 0/30']) expect(result.stdout).toContain(value);
});
