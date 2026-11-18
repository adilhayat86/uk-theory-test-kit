#!/usr/bin/env node
/** Export original app content for real human review; never creates an approval. */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { ROOT, TRACKERS, buildCatalogue, hashBytes } = require('./review-content.cjs');
const { readReviewRecords } = require('./check-editorial-review.cjs');

const PENDING = 'PENDING_INDEPENDENT_REVIEW';
const COMMON = ['review_status', 'reviewer', 'review_date', 'notes'];
function csv(headers, records) {
  const cell = value => /[",\r\n]/.test(String(value ?? '')) ? '"' + String(value ?? '').replace(/"/g, '""') + '"' : String(value ?? '');
  return [headers.join(','), ...records.map(record => headers.map(header => cell(record[header])).join(','))].join('\n') + '\n';
}
function trackerHeaders(tracker) {
  return tracker.kind === 'question'
    ? ['question_id', 'topic', 'reference', 'primary_source_url', 'content_sha256', ...COMMON]
    : ['content_id', 'content_kind', 'title', 'content_sha256', ...COMMON];
}
function existingRecords(filename, idColumn) {
  if (!fs.existsSync(filename)) return [];
  return readReviewRecords(filename, [idColumn, 'review_status', 'reviewer', 'review_date', 'notes']);
}
function refreshRecords(entries, previous, tracker) {
  const byId = new Map();
  for (const record of previous) {
    const id = record[tracker.idColumn];
    if (!id || byId.has(id)) throw new Error('Cannot refresh missing or duplicate review identity: ' + id);
    byId.set(id, record);
  }
  return entries.map(entry => {
    const old = byId.get(entry.id);
    const unchanged = old?.content_sha256 === entry.content_sha256;
    let notes = old?.notes ?? '';
    if (!unchanged && old?.review_status === 'APPROVED') {
      notes += (notes ? '\n' : '') + `Previous approval (${old.reviewer || 'unnamed'}, ${old.review_date || 'undated'}) invalidated by changed or unbound content; re-review required.`;
    }
    return {
      [tracker.idColumn]: entry.id,
      ...(entry.kind === 'question' ? entry.metadata : { content_kind: entry.kind, title: entry.title }),
      content_sha256: entry.content_sha256,
      review_status: unchanged ? old.review_status : PENDING,
      reviewer: unchanged ? old.reviewer : '',
      review_date: unchanged ? old.review_date : '',
      notes,
    };
  });
}
function walkAssets(value, assets = new Map()) {
  if (!value || typeof value !== 'object') return assets;
  if (typeof value.file === 'string' && /^[a-f0-9]{64}$/.test(value.sha256 || '')) assets.set(value.file, value);
  for (const item of Object.values(value)) walkAssets(item, assets);
  return assets;
}
function sourceMetadata(root) {
  const run = args => spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true });
  const head = run(['rev-parse', 'HEAD']);
  const status = run(['status', '--porcelain', '--', 'src/data', 'src/assets']);
  return { source_commit: head.status === 0 ? head.stdout.trim() : null,
    source_content_worktree_dirty: status.status === 0 ? status.stdout.trim().length > 0 : null };
}
function formatQuestion(question) {
  return `${question.prompt}\n\n${question.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n')}\n\n**Correct:** ${String.fromCharCode(65 + question.correctIndex)} — ${question.options[question.correctIndex]}\n\n${question.explanation}\n\nSource: [${question.reference}](${question.sourceUrl})`;
}
function entryMarkdown(entry, mediaLink) {
  const lines = [`## ${entry.id} — ${entry.title}`, '', `Content SHA-256: \`${entry.content_sha256}\``, ''];
  if (entry.kind === 'question') {
    lines.push(formatQuestion(entry.content.question), '');
    for (const [context, asset] of [['Unanswered question', entry.content.questionImage], ['Answer review', entry.content.reviewImage]]) {
      if (asset) lines.push(`${context}: ${asset.id}; visible caption: ${context === 'Unanswered question' ? '(hidden)' : asset.label}; accessible description: ${context === 'Unanswered question' ? asset.visualDescription : asset.label}`, '', `![${asset.visualDescription}](${mediaLink(asset.source.file)})`, '');
    }
    if (entry.content.video) lines.push(`[Play linked video: ${entry.content.video.title}](${mediaLink(entry.content.video.source.file)})`, '');
  } else if (entry.kind === 'lesson') {
    const lesson = entry.content.lesson;
    lines.push(`Module: \`${lesson.moduleId}\` · content version ${lesson.version} · estimated ${lesson.minutes} minutes`, '',
      '### Objectives', '', ...lesson.objectives.map(value => '- ' + value), '');
    for (const section of lesson.sections) {
      lines.push('### ' + section.title, '', ...section.paragraphs.flatMap(value => [value, '']));
      const image = entry.content.linkedImages.find(asset => asset.id === section.imageAssetId);
      if (image) lines.push(`![${image.label}](${mediaLink(image.source.file)})`, '');
      const video = entry.content.linkedVideos.find(asset => asset.id === section.caseStudyId);
      if (video) lines.push(`[Play original case study: ${video.title}](${mediaLink(video.source.file)})`, '');
    }
    lines.push('### ' + lesson.scenario.title, '', lesson.scenario.text, '', '### Recap', '',
      ...lesson.takeaways.map(value => '- ' + value), '', '### Sources', '',
      ...lesson.sources.map(source => `- [${source.title}](${source.url})`), '',
      'Mapped questions: ' + lesson.questionIds.map(id => '`' + id + '`').join(', '), '');
  } else if (entry.kind === 'sign-note') {
    const note = entry.content.note;
    const sourcePages = {
      'The signing system': 'the-signing-system', 'Regulatory signs': 'regulatory-signs',
      'Warning signs': 'warning-signs', 'Speed limit signs': 'speed-limit-signs', 'Information signs': 'information-signs',
    };
    const chapter = Object.keys(sourcePages).find(title => note.reference.endsWith(title));
    const source = chapter ? `[${note.reference}](https://www.gov.uk/government/publications/know-your-traffic-signs/${sourcePages[chapter]})` : note.reference;
    lines.push(note.description, '', '**Takeaway:** ' + note.takeaway, '',
      `Quiz: ${note.quiz.prompt}`, '', ...note.quiz.answers.map((answer, index) => `${String.fromCharCode(65 + index)}. ${answer}`), '',
      `Correct: ${String.fromCharCode(65 + note.quiz.correctIndex)} — ${note.quiz.answers[note.quiz.correctIndex]}`, '', 'Reference: ' + source, '');
    for (const asset of [entry.content.image, entry.content.studyImage].filter(Boolean)) lines.push(`![${asset.label}](${mediaLink(asset.source.file)})`, '');
  } else {
    const asset = entry.content.asset;
    if (entry.kind === 'image') lines.push(`![${asset.visualDescription}](${mediaLink(asset.source.file)})`, '',
      'Caption: ' + asset.label, '', 'Unanswered accessible description: ' + asset.visualDescription, '');
    else lines.push(asset.description, '', `Duration: ${asset.durationSeconds} seconds; original silent animation.`, '', `[Play video](${mediaLink(asset.source.file)})`, '');
    lines.push('File: `' + asset.source.file + '`', '', 'File SHA-256: `' + asset.source.sha256 + '`', '');
  }
  return lines.join('\n');
}

function exportReview({ root = ROOT, output = path.join(root, 'docs/reviewer-pack'), refreshTrackers = false, copyMedia = false } = {}) {
  const catalogue = buildCatalogue(root);
  output = path.resolve(output);
  fs.mkdirSync(output, { recursive: true });
  const rowsByKind = {};
  for (const tracker of TRACKERS) {
    const filename = path.join(root, 'docs', tracker.file);
    const previous = existingRecords(filename, tracker.idColumn);
    const entries = catalogue.entries.filter(entry => entry.kind === tracker.kind);
    const records = refreshRecords(entries, previous, tracker);
    const headers = trackerHeaders(tracker);
    if (refreshTrackers) fs.writeFileSync(filename, csv(headers, records));
    fs.writeFileSync(path.join(output, tracker.file), csv(headers, records));
    rowsByKind[tracker.kind] = records;
  }
  const assets = [...walkAssets(catalogue.entries).values()];
  const mediaTargets = new Map();
  for (const asset of assets) {
    const source = path.resolve(root, asset.file);
    if (hashBytes(fs.readFileSync(source)) !== asset.sha256) throw new Error('Media changed during export: ' + asset.file);
    if (copyMedia) {
      const target = path.join(output, 'media', asset.file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(source, target);
      mediaTargets.set(asset.file, path.relative(output, target).split(path.sep).join('/'));
    } else mediaTargets.set(asset.file, path.relative(output, source).split(path.sep).join('/'));
  }
  const mediaLink = file => mediaTargets.get(file).split('/').map(segment => encodeURIComponent(segment)).join('/');
  const referenceDocuments = [];
  for (const filename of ['ASSET_LICENCES.md', 'IMAGE_LIBRARY_REVIEW.md', 'content-sources.md', 'COURSE_CONTENT_REVIEW.md', 'QUESTION_BANK_EDITORIAL_AUDIT.md']) {
    const source = path.join(root, 'docs', filename);
    if (!fs.existsSync(source)) continue;
    const bytes = fs.readFileSync(source);
    const target = path.join(output, 'references', filename);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, bytes);
    referenceDocuments.push({ source: 'docs/' + filename, review_path: 'references/' + filename, sha256: hashBytes(bytes) });
  }
  const manifest = { schemaVersion: catalogue.schemaVersion, generated_at_utc: new Date().toISOString(),
    ...sourceMetadata(root), catalogue_sha256: catalogue.catalogue_sha256, counts: catalogue.counts,
    review_status: 'REQUIRES_STRICT_GATE_AND_INDEPENDENT_HUMAN_REVIEW', media_included: copyMedia,
    recorded_status_counts: Object.fromEntries(TRACKERS.map(tracker => [tracker.kind,
      rowsByKind[tracker.kind].reduce((counts, row) => ({ ...counts, [row.review_status]: (counts[row.review_status] ?? 0) + 1 }), {})])),
    media_files: assets.map(asset => ({ ...asset, review_path: mediaTargets.get(asset.file) })),
    reference_documents: referenceDocuments,
    notice: 'This export contains the app’s independently authored revision content. Source links and hashes do not constitute editorial, licensing or paid-release approval.' };
  fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  fs.writeFileSync(path.join(output, 'content-review.json'), JSON.stringify(catalogue, null, 2) + '\n');
  for (const tracker of TRACKERS) {
    const title = { question: 'Questions', lesson: 'Lessons', video: 'Video case studies', image: 'Learning illustrations', 'sign-note': 'Road-sign notes and quizzes' }[tracker.kind];
    const entries = catalogue.entries.filter(entry => entry.kind === tracker.kind);
    const header = `# ${title} — independent review copy\n\nReview every entry against current primary sources, its presentation and linked media. Record judgement in \`${tracker.file}\`; do not approve by sampling.\n\n`;
    fs.writeFileSync(path.join(output, tracker.kind + 's.md'), header + entries.map(entry => entryMarkdown(entry, mediaLink)).join('\n\n---\n\n') + '\n');
  }
  const readme = `# Android paid-MVP editorial review pack

This is a concrete review copy of the bundled original app content, not an approval or a reproduction of the licensed DVSA question bank. The CSVs and manifest show recorded review status. Generating this pack never creates an approval. Do not mark rows approved merely because this export or CI succeeds.

Catalogue SHA-256: \`${catalogue.catalogue_sha256}\`.

## What to review

| Content | Entries | Reading copy | Record decisions |
| --- | ---: | --- | --- |
${TRACKERS.map(tracker => `| ${tracker.kind} | ${catalogue.counts[tracker.kind]} | [Read](${tracker.kind}s.md) | [${tracker.file}](${tracker.file}) |`).join('\n')}

The image list includes logical aliases as separate presentation records. The manifest lists ${assets.length} distinct media files; aliases can share bytes, but captions, neutral accessibility wording and teaching context still need checking. Unselected artwork drafts are excluded.

${referenceDocuments.length ? '## Source and licensing notes\n\n' + referenceDocuments.map(document => `- [${path.basename(document.source)}](${document.review_path})`).join('\n') + '\n\nThese are copies of the project’s existing evidence notes, identified by their own SHA-256 values in the manifest. They are not new legal/source approval. Some historical source-tree links in these notes may require the full repository; the content and media reading copies above are included in this export.\n' : ''}

## Reviewer procedure

1. Review all questions, all lesson text/scenarios/recaps, the complete videos, every selected image/presentation and every sign note/quiz. Open the primary sources. Check legal MUST wording versus advice, GB regional differences, answer uniqueness, useful distractors, teaching-to-test fit and original-content/licensing attribution.
2. Check image/video timing, UK traffic direction, question relevance, answer-caption hiding, accessible descriptions and sufficient visual clarity. Media links ${copyMedia ? 'are included in this folder' : 'refer to the existing source tree; export with --copy-media to make a standalone folder'}.
3. Enter APPROVED only after a real independent human review, with the reviewer’s name and UTC date (YYYY-MM-DD). Use NEEDS_CHANGES with actionable notes for rejected material. Do not modify content_sha256 to conceal a change.
4. Return the completed CSVs to the app owner. Source changes must be made in the app and a fresh pack generated. Changed text, answers, mappings, captions or media bytes invalidate the affected approvals; the refresh command retains comments and removes stale approval.
5. The owner copies reviewed records to docs/ and runs the strict editorial gate. A passing record gate verifies traceable matching evidence; it cannot prove that a human actually performed the review. Production signing, store/privacy setup and the separate owner release decision remain necessary.

## Commands

\`node scripts/export-editorial-review.cjs --refresh-trackers\` refreshes current hashes, preserves unchanged recorded decisions and resets changed approvals to pending. It never creates an approval.

\`node scripts/export-editorial-review.cjs --output PATH --copy-media\` exports a standalone review folder with the exact media bytes. Source decision sheets change only when --refresh-trackers is supplied.

\`node scripts/check-editorial-review.cjs\` strictly checks all five current content categories. \`--report-only\` reports the same unresolved review without blocking an internal development build. Neither command publishes an app.
`;
  fs.writeFileSync(path.join(output, 'README.md'), readme);
  return { ...manifest, output };
}

function main(args = process.argv.slice(2)) {
  const options = {};
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--refresh-trackers') options.refreshTrackers = true;
    else if (args[i] === '--copy-media') options.copyMedia = true;
    else if (args[i] === '--output' && args[i + 1] && !args[i + 1].startsWith('--')) options.output = args[++i];
    else throw new Error('Usage: node scripts/export-editorial-review.cjs [--refresh-trackers] [--output PATH] [--copy-media]');
  }
  const result = exportReview(options);
  console.log(`Review pack exported to ${result.output}`);
  console.log(JSON.stringify(result.counts));
  console.log('No human approval was created. Catalogue SHA-256: ' + result.catalogue_sha256);
}
if (require.main === module) main();
module.exports = { csv, refreshRecords, trackerHeaders, walkAssets, exportReview };
