const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createStaticReader, buildCatalogue, hashContent, hashBytes } = require('./review-content.cjs');
const { exportReview } = require('./export-editorial-review.cjs');
const { parseCsv, evaluateCatalogue } = require('./check-editorial-review.cjs');
const { csv } = require('./export-editorial-review.cjs');

let directory;
beforeEach(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), 'theorykit-review-content-'));
  fs.mkdirSync(path.join(directory, 'src/data'), { recursive: true });
  fs.mkdirSync(path.join(directory, 'src/assets'), { recursive: true });
  fs.mkdirSync(path.join(directory, 'docs'), { recursive: true });
});
afterEach(() => {
  const resolved = path.resolve(directory);
  if (!resolved.startsWith(path.join(path.resolve(os.tmpdir()), 'theorykit-review-content-'))) throw new Error('Unexpected review fixture directory');
  fs.rmSync(resolved, { recursive: true, force: true });
});
function write(file, value) {
  const target = path.join(directory, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value);
  return target;
}
function fixture() {
  // File bytes are fixtures for hashing, not a claim of valid/approved media.
  write('src/assets/one.png', 'one fixture image');
  write('src/assets/two.png', 'another fixture image');
  write('src/assets/clip.mp4', 'fixture video bytes');
  write('src/data/questions.ts', `export const questions=[{id:'q',topic:'Road rules',difficulty:'standard',prompt:'A fixture prompt',
    options:['A','B','C','D'],correctIndex:0,explanation:'A fixture explanation',reference:'Fixture source',sourceUrl:'https://www.gov.uk/example',
    imageAssetId:'one',caseStudyVideoAssetId:'clip'}];`);
  write('src/data/course.ts', `export const courseLessons=[{id:'lesson',moduleId:'module',title:'Fixture lesson',version:1,minutes:2,
    objectives:['Objective'],sections:[{id:'first',title:'A section',paragraphs:['Original teaching'],imageAssetId:'one',caseStudyId:'clip'}],
    scenario:{title:'Scenario',text:'An original scenario'},takeaways:['Recap'],sources:[{title:'Source',url:'https://www.gov.uk/example'}],questionIds:['q']}];`);
  write('src/data/illustrationAssets.ts', `const first={source:require('../assets/one.png'),label:'Caption',visualDescription:'Neutral first image',width:10,height:10};
    export const illustrationAssets={one:first,two:{source:require('../assets/two.png'),label:'Review caption',visualDescription:'Neutral second image',width:10,height:10}};`);
  write('src/data/caseStudies.ts', `export const caseStudies={clip:{id:'clip',title:'Fixture clip',description:'Neutral description',durationSeconds:20,source:require('../assets/clip.mp4')}};`);
  write('src/data/studyImages.ts', `export const studyImageBindings={q:'two'}; export const roadSignStudyImages={note:'two'};`);
  write('src/data/teachingImages.ts', `export const questionTeachingImages={};`);
  write('src/data/roadSigns.ts', `export const roadSignFacts=[{id:'note',title:'Sign note',imageAssetId:'one',category:'Orders',description:'A note',takeaway:'A takeaway',reference:'Fixture source',quiz:{prompt:'Quiz prompt',answers:['A','B','C','D'],correctIndex:0}}];`);
  return buildCatalogue(directory);
}
const hashes = catalogue => Object.fromEntries(catalogue.entries.map(entry => [entry.kind + ':' + entry.id, entry.content_sha256]));

test('fingerprints are canonical for object keys, preserve array order and reject non-JSON data', () => {
  expect(hashContent({ b: 2, a: { y: 3, x: 1 } })).toBe(hashContent({ a: { x: 1, y: 3 }, b: 2 }));
  expect(hashContent(['A', 'B'])).not.toBe(hashContent(['B', 'A']));
  expect(() => hashContent({ value: Infinity })).toThrow(/finite JSON/);
  expect(() => hashContent(new Date())).toThrow(/finite JSON/);
});

test('the static reader resolves imported const arrays, object spreads, aliases and real bundled-byte hashes without executing functions', () => {
  write('src/assets/one.png', 'fixture');
  write('src/data/shared.ts', `const local={source:require('../assets/one.png'),label:'Caption'};export {local as asset};`);
  write('src/data/data.ts', `import {asset as imported} from './shared';const base={one:imported};export const result={...base,alias:base['one']} as const;`);
  const value = createStaticReader(directory)('src/data/data.ts', 'result');
  expect(value.alias).toEqual(value.one);
  expect(value.one.source).toEqual({ file: 'src/assets/one.png', sha256: hashBytes(Buffer.from('fixture')) });
  global.__reviewExecuted = false;
  write('src/data/data.ts', `export const result=(()=>{global.__reviewExecuted=true;return []})()`);
  expect(() => createStaticReader(directory)('src/data/data.ts', 'result')).toThrow(/Unsupported static review expression/);
  expect(global.__reviewExecuted).toBe(false);
  delete global.__reviewExecuted;
});

test('static review data refuses imports/asset access outside its safe roots, mutable bindings and prototype access', () => {
  write('outside.png', 'private fixture');
  for (const source of [
    `export const result=require('../../outside.png');`,
    `import {readFileSync} from 'node:fs';export const result=readFileSync;`,
    `let value=[];export const result=value;`,
    `const value={one:1};export const result=value.constructor;`,
    `export const result={'__proto__':{polluted:true}};`,
  ]) {
    write('src/data/data.ts', source);
    expect(() => createStaticReader(directory)('src/data/data.ts', 'result')).toThrow();
  }
  expect({}.polluted).toBeUndefined();
});

test('changing actual image bytes invalidates its approval and all dependent question, lesson and sign-note fingerprints', () => {
  const before = hashes(fixture());
  write('src/assets/one.png', 'changed image bytes');
  const after = hashes(buildCatalogue(directory));
  for (const id of ['image:one', 'question:q', 'lesson:lesson', 'sign-note:note']) expect(after[id]).not.toBe(before[id]);
  expect(after['video:clip']).toBe(before['video:clip']);
  expect(after['image:two']).toBe(before['image:two']);
});

test('changing actual video bytes invalidates its approval and every linked teaching/assessment fingerprint', () => {
  const before = hashes(fixture());
  write('src/assets/clip.mp4', 'changed video bytes');
  const after = hashes(buildCatalogue(directory));
  for (const id of ['video:clip', 'question:q', 'lesson:lesson']) expect(after[id]).not.toBe(before[id]);
  expect(after['sign-note:note']).toBe(before['sign-note:note']);
  expect(after['image:one']).toBe(before['image:one']);
});

test('changed teaching-image mappings and neutral captions require re-review even when image IDs and question text stay the same', () => {
  let before = hashes(fixture());
  write('src/data/studyImages.ts', `export const studyImageBindings={q:'one'};export const roadSignStudyImages={note:'two'};`);
  let after = hashes(buildCatalogue(directory));
  expect(after['question:q']).not.toBe(before['question:q']);
  expect(after['lesson:lesson']).not.toBe(before['lesson:lesson']);
  before = after;
  const file = path.join(directory, 'src/data/illustrationAssets.ts');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('Neutral first image', 'Changed accessible description'));
  after = hashes(buildCatalogue(directory));
  for (const id of ['image:one', 'question:q', 'lesson:lesson', 'sign-note:note']) expect(after[id]).not.toBe(before[id]);
});

test('a changed question answer also invalidates lessons which assess that question', () => {
  const before = hashes(fixture());
  const file = path.join(directory, 'src/data/questions.ts');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('correctIndex:0', 'correctIndex:3'));
  const after = hashes(buildCatalogue(directory));
  expect(after['question:q']).not.toBe(before['question:q']);
  expect(after['lesson:lesson']).not.toBe(before['lesson:lesson']);
  expect(after['image:one']).toBe(before['image:one']);
});

test('a standalone human review export includes exact media bytes, full original teaching and pending decision sheets without approving anything', () => {
  fixture();
  write('docs/ASSET_LICENCES.md', '# Fixture licence evidence\nNo approval implied.\n');
  const output = path.join(directory, 'standalone-pack');
  const result = exportReview({ root: directory, output, copyMedia: true, refreshTrackers: true });
  expect(result.counts).toEqual({ question: 1, lesson: 1, video: 1, image: 2, 'sign-note': 1 });
  expect(result.media_included).toBe(true);
  expect(result.media_files).toHaveLength(3);
  expect(result.reference_documents).toHaveLength(1);
  const reference = result.reference_documents[0];
  expect(hashBytes(fs.readFileSync(path.join(output, reference.review_path)))).toBe(reference.sha256);
  for (const file of result.media_files) expect(hashBytes(fs.readFileSync(path.join(output, file.review_path)))).toBe(file.sha256);
  expect(fs.readFileSync(path.join(output, 'lessons.md'), 'utf8')).toContain('Original teaching');
  expect(fs.readFileSync(path.join(output, 'questions.md'), 'utf8')).toContain('**Correct:** A');
  expect(fs.readFileSync(path.join(output, 'README.md'), 'utf8')).toContain('real independent human review');
  const catalogue = JSON.parse(fs.readFileSync(path.join(output, 'content-review.json'), 'utf8'));
  for (const entry of catalogue.entries) expect(hashContent(entry.content)).toBe(entry.content_sha256);
  for (const file of ['QUESTION', 'LESSON', 'VIDEO', 'IMAGE', 'SIGN_NOTE']) {
    const filename = path.join(directory, 'docs', file + '_REVIEW_TRACKER.csv');
    const text = fs.readFileSync(filename, 'utf8');
    expect(text).toContain('PENDING_INDEPENDENT_REVIEW');
    expect(text).not.toContain(',APPROVED,');
    // Positive gate fixture only: never writes any real repository approval.
    const [headers, ...rows] = parseCsv(text);
    const records = rows.map(row => ({ ...Object.fromEntries(headers.map((header, index) => [header, row[index]])),
      review_status: 'APPROVED', reviewer: 'Fixture independent reviewer', review_date: '2026-11-17' }));
    fs.writeFileSync(filename, csv(headers, records));
  }
  expect(evaluateCatalogue(catalogue, path.join(directory, 'docs'), { today: '2026-11-18' }).ready).toBe(true);
});
