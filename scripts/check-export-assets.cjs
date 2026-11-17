const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const [directory, platform = 'android', mode = 'learner'] = process.argv.slice(2);
assert(directory, 'Usage: node scripts/check-export-assets.cjs DIRECTORY [android|ios] [learner|review]');
assert(['learner', 'review'].includes(mode), 'Unknown artwork mode');
const root = path.resolve(__dirname, '..');
const manifest = require('../src/assets/illustrations-v2/image-manifest.json');
const metadata = JSON.parse(fs.readFileSync(path.join(directory, 'metadata.json'), 'utf8'));
const exported = metadata.fileMetadata[platform];
assert(exported, `No ${platform} bundle in export metadata`);
assert(fs.statSync(path.join(directory, exported.bundle)).size > 0, 'Empty JavaScript bundle');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const pngs = exported.assets.filter((asset) => asset.ext === 'png');
const hashes = new Set(pngs.map((asset) => hash(fs.readFileSync(path.join(directory, asset.path)))));

// Verify actual packaged bytes, rather than trusting a hidden menu or flag.
for (const registry of ['illustrationAssets.ts', 'dftSignAssets.ts', 'teachingImages.ts', 'studyImages.ts']) {
  const file = path.join(root, 'src/data', registry);
  const requires = fs.readFileSync(file, 'utf8').matchAll(/require\(['"]([^'"]+\.png)['"]\)/g);
  for (const [, relative] of requires) {
    assert(hashes.has(hash(fs.readFileSync(path.resolve(path.dirname(file), relative)))),
      `Missing learner illustration: ${relative}`);
  }
}
const selectedDraftIds = new Set(require('../src/assets/illustrations-v2/learner-selection.json').assetIds);
for (const asset of manifest.assets) {
  const expected = mode === 'review' || selectedDraftIds.has(asset.id);
  assert.equal(hashes.has(asset.sha256), expected,
    expected ? `Missing offline image: ${asset.id}` : `Unselected artwork leaked into learner build: ${asset.id}`);
}
// Case studies must be real bundled videos in both learner and internal-review exports.
const caseRegistry = path.join(root, 'src/data/caseStudies.ts');
const requiredVideos = [...fs.readFileSync(caseRegistry, 'utf8').matchAll(/require\(['"]([^'"]+\.mp4)['"]\)/g)]
  .map(([, relative]) => relative);
assert(requiredVideos.length >= 3, 'At least three local video case studies must be registered');
assert.equal(new Set(requiredVideos).size, requiredVideos.length, 'Case studies must reference distinct local videos');
const videos = exported.assets.filter((asset) => asset.ext === 'mp4');
const videoHashes = new Set(videos.map((asset) => {
  const bytes = fs.readFileSync(path.join(directory, asset.path));
  assert(bytes.length > 1024 && bytes.toString('ascii', 4, 8) === 'ftyp', `Invalid exported MP4: ${asset.path}`);
  return hash(bytes);
}));
for (const relative of requiredVideos) {
  const filename = path.resolve(path.dirname(caseRegistry), relative);
  assert(fs.existsSync(filename), `Registered case-study video is missing: ${relative}`);
  const bytes = fs.readFileSync(filename);
  assert(bytes.length > 1024 && bytes.toString('ascii', 4, 8) === 'ftyp', `Invalid local MP4: ${relative}`);
  assert(videoHashes.has(hash(bytes)), `Missing offline case-study video bytes: ${relative}`);
}
console.log(`${platform} ${mode}: ${requiredVideos.length} registered offline case-study videos verified by SHA-256.`);

const imageBytes = pngs.reduce((sum, asset) => sum + fs.statSync(path.join(directory, asset.path)).size, 0);
console.log(`${platform} ${mode}: ${pngs.length} packaged PNGs, ${(imageBytes / 1024 / 1024).toFixed(2)} MiB; artwork separation verified.`);
