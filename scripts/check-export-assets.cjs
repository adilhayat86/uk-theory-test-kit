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
const originalNames = fs.readdirSync(path.join(root, 'src/assets')).filter((name) => name.endsWith('.png'));
for (const name of originalNames) {
  assert(hashes.has(hash(fs.readFileSync(path.join(root, 'src/assets', name)))), `Missing learner diagram: ${name}`);
}
for (const asset of manifest.assets) {
  assert.equal(hashes.has(asset.sha256), mode === 'review',
    mode === 'review' ? `Missing offline review image: ${asset.id}` : `Draft artwork leaked into learner build: ${asset.id}`);
}
const imageBytes = pngs.reduce((sum, asset) => sum + fs.statSync(path.join(directory, asset.path)).size, 0);
console.log(`${platform} ${mode}: ${pngs.length} packaged PNGs, ${(imageBytes / 1024 / 1024).toFixed(2)} MiB; artwork separation verified.`);
