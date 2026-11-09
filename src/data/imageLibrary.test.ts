/// <reference types="node" />
import { createHash } from 'crypto';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import manifest from '../assets/illustrations-v2/image-manifest.json';
import { draftImageSources } from './draftImageSources';
import { illustrationAssets, illustrationPresentation } from './illustrationAssets';
import { questions } from './questions';

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

test('drafts retain pending tracker rows and cannot enter the question image registry', () => {
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

test('original diagram dimensions describe the actual files', () => {
  for (const [id, asset] of Object.entries(illustrationAssets)) {
    const bytes = readFileSync(join(__dirname, `../assets/${id}.png`));
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([asset.width, asset.height]);
  }
});
