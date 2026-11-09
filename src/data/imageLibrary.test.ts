/// <reference types="node" />
import { createHash } from 'crypto';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import manifest from '../assets/illustrations-v2/image-manifest.json';
import { draftImageSources } from './draftImageSources';
import { illustrationAssets, illustrationPresentation } from './illustrationAssets';
import { questions } from './questions';
import dftSources from '../assets/dft-signs/sources.json';

const root = join(__dirname, '../assets/illustrations-v2');

test('all 121 imported images have unique IDs, bytes, static sources and matching PNG metadata', () => {
  expect(manifest.assets).toHaveLength(121);
  expect(manifest.assetCount).toBe(manifest.assets.length);
  expect(new Set(manifest.assets.map((item) => item.id)).size).toBe(121);
  expect(new Set(manifest.assets.map((item) => item.sha256)).size).toBe(121);
  expect(Object.keys(draftImageSources).sort()).toEqual(manifest.assets.map((item) => item.id).sort());
  expect(readdirSync(join(root, 'images')).filter((name) => name.endsWith('.png'))).toHaveLength(121);
  for (const asset of manifest.assets) {
    const bytes = readFileSync(join(root, asset.file));
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([asset.width, asset.height]);
  }
});

test('drafts retain pending tracker rows and are not assigned directly to the question bank', () => {
  expect(manifest.readyForRelease).toBe(false);
  const tracker = readFileSync(join(root, 'image-review-tracker.csv'), 'utf8');
  const registry = readFileSync(join(__dirname, 'draftImageSources.ts'), 'utf8');
  expect(registry.match(/require\('[^']+\.png'\)/g)).toHaveLength(121);
  for (const asset of manifest.assets) {
    expect(asset.status).toBe('DRAFT_REVIEW_REQUIRED');
    expect(tracker.split(/\r?\n/).filter((row) => row.startsWith(`${asset.id},`))).toHaveLength(1);
    expect(asset.id in illustrationAssets).toBe(false);
    expect(questions.some((question) => String(question.imageAssetId) === asset.id)).toBe(false);
  }
});

test('question captions never expose sign meanings, while review and learning can reveal them', () => {
  for (const id of Object.keys(illustrationAssets) as (keyof typeof illustrationAssets)[]) {
    const quiz = illustrationPresentation(id, 'question');
    expect(quiz.caption).toBeNull();
    expect(quiz.accessibilityLabel).toBe(illustrationAssets[id].visualDescription);
    for (const context of ['review', 'learn'] as const) {
      expect(illustrationPresentation(id, context).caption).toBe(illustrationAssets[id].label);
    }
  }
  expect(illustrationPresentation('national-speed-limit', 'question').accessibilityLabel).not.toMatch(/national|limit/i);
  expect(illustrationPresentation('no-entry', 'question').accessibilityLabel).not.toMatch(/no entry/i);
});

test('static illustration dimensions describe the actual PNG files', () => {
  for (const registry of ['illustrationAssets.ts', 'dftSignAssets.ts', 'teachingImages.ts']) {
    const code = readFileSync(join(__dirname, registry), 'utf8');
    const entries = [...code.matchAll(/require\(['"]([^'"]+\.png)['"]\).*?width: (\d+), height: (\d+)/g)];
    expect(entries.length).toBeGreaterThan(0);
    for (const [, file, width, height] of entries) {
      const bytes = readFileSync(join(__dirname, file));
      expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([Number(width), Number(height)]);
    }
  }
});

test('DfT artwork retains source, licence and hashes for both vectors and raster images', () => {
  expect(dftSources.assets).toHaveLength(30);
  expect(dftSources.licenceUrl).toContain('open-government-licence/version/3');
  for (const item of dftSources.assets) {
    expect(item.sourceUrl).toMatch(/^https:\/\/www.gov.uk\//);
    for (const [extension, digest] of [['svg', item.svgSha256], ['png', item.pngSha256]]) {
      const bytes = readFileSync(join(__dirname, '../assets/dft-signs', item.id + '.' + extension));
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(digest);
    }
  }
});
