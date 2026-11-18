#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { buildCatalogue } = require('./review-content.cjs');
const { evaluateCatalogue } = require('./check-editorial-review.cjs');

const TEST_CERTIFICATE = 'fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c';
const REQUIRED_BLOCKED = [
  'android.permission.READ_EXTERNAL_STORAGE',
  'android.permission.WRITE_EXTERNAL_STORAGE',
  'android.permission.SYSTEM_ALERT_WINDOW',
  'android.permission.VIBRATE',
];
const SIGNING_VARIABLES = [
  'ANDROID_UPLOAD_KEYSTORE_PATH', 'ANDROID_UPLOAD_STORE_PASSWORD',
  'ANDROID_UPLOAD_KEY_ALIAS', 'ANDROID_UPLOAD_KEY_PASSWORD',
];

function checkInternal(app, release) {
  const issues = [];
  if (JSON.stringify(app.platforms) !== JSON.stringify(['android'])) issues.push('This MVP must enable Android only');
  if (release.platform !== 'android') issues.push('Release metadata must identify Android');
  if (!['internal-mvp', 'production-candidate'].includes(release.status)) issues.push('Unknown release status');
  if (!/^\d+\.\d+\.\d+$/.test(app.version || '') || !Number.isSafeInteger(app.android?.versionCode) || app.android.versionCode < 1) {
    issues.push('Set a valid app version and positive Android version code');
  }
  if (app.android?.allowBackup !== false || release.progressBackup !== 'disabled') {
    issues.push('The local-only MVP must explicitly disable progress backup');
  }
  for (const permission of REQUIRED_BLOCKED) {
    if (!app.android?.blockedPermissions?.includes(permission)) issues.push('Block unused permission: ' + permission);
  }
  const plugins = new Set((app.plugins || []).map(plugin => Array.isArray(plugin) ? plugin[0] : plugin));
  for (const plugin of ['./plugins/withAndroidLocalData', './plugins/withAndroidReleaseSigning']) {
    if (!plugins.has(plugin)) issues.push('Missing required Android config plugin: ' + plugin);
  }
  if (release.purchaseModel !== 'paid-download' || release.allContentIncluded !== true ||
      release.advertising !== false || release.subscriptions !== false || release.inAppPurchases !== false) {
    issues.push('MVP is a one-time paid download with all content included, no ads, subscriptions or in-app purchases');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(release.supportEmail || '')) issues.push('Configure a valid support email');
  if (!Number.isSafeInteger(release.minimumAndroidApi) || !Number.isSafeInteger(release.minimumTargetApi) ||
      release.minimumTargetApi < 36 || release.minimumAndroidApi > release.minimumTargetApi) {
    issues.push('Invalid or outdated Android SDK release policy');
  }
  return issues;
}

function publicHttpsUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase().replace(/\.$/, '');
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password &&
      host.includes('.') && host !== 'localhost' && !host.endsWith('.localhost') &&
      !/\.(?:local|test|invalid|example)$/.test(host) && !/^(?:127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host) &&
      !/^172\.(?:1[6-9]|2\d|3[01])\./.test(host) &&
      !/^(?:example\.(?:com|org|net)|.+\.example\.(?:com|org|net))$/.test(host);
  } catch {
    return false;
  }
}

function checkProduction(release, environment, isFile = filename => {
  try { return fs.statSync(filename).isFile(); } catch { return false; }
}) {
  const issues = [];
  if (release.status !== 'production-candidate') issues.push('Publisher has not selected production-candidate status');
  if (typeof release.publisherLegalName !== 'string' || !release.publisherLegalName.trim()) {
    issues.push('Publisher legal identity is not configured');
  }
  if (!publicHttpsUrl(release.privacyPolicyUrl)) issues.push('A real public HTTPS privacy-policy URL is not configured');
  const certificate = release.uploadCertificateSha256;
  if (!/^[a-fA-F0-9]{64}$/.test(certificate || '') || certificate.toLowerCase() === TEST_CERTIFICATE) {
    issues.push('Record the owner upload certificate; the development certificate cannot be used');
  }
  if (environment.ANDROID_BUILD_CHANNEL !== 'production') issues.push('ANDROID_BUILD_CHANNEL must be production');
  if (environment.EXPO_PUBLIC_IMAGE_REVIEW !== 'false') issues.push('EXPO_PUBLIC_IMAGE_REVIEW must be false for production');
  for (const variable of SIGNING_VARIABLES) {
    if (!environment[variable]) issues.push('Missing owner signing variable: ' + variable);
  }
  if (environment.ANDROID_UPLOAD_KEYSTORE_PATH && !isFile(environment.ANDROID_UPLOAD_KEYSTORE_PATH)) {
    issues.push('Owner upload keystore is unavailable');
  }
  return issues;
}

function main() {
  const root = path.resolve(__dirname, '..');
  const app = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8')).expo;
  const release = JSON.parse(fs.readFileSync(path.join(root, 'release/android-release.json'), 'utf8'));
  const production = process.argv.includes('--production');
  const issues = checkInternal(app, release);
  const privacy = path.join(root, 'release/privacy/index.html');
  if (!fs.existsSync(privacy)) {
    issues.push('Prepared privacy-policy webpage is missing');
  } else {
    const html = fs.readFileSync(privacy, 'utf8');
    if (!html.includes(app.name) || !html.includes(release.supportEmail)) issues.push('Privacy webpage identity/contact differs from release metadata');
  }
  if (production) {
    issues.push(...checkProduction(release, process.env));
    const editorial = evaluateCatalogue(buildCatalogue(root), path.join(root, 'docs'));
    if (!editorial.ready) issues.push('Independent content approval is incomplete: ' + editorial.approved + '/' + editorial.total);
  }
  console.log('Android ' + (production ? 'production preflight' : 'internal MVP configuration') + ': ' +
    (issues.length ? 'NOT READY' : 'PASS'));
  for (const issue of issues) console.log(' - ' + issue);
  if (!production && !issues.length) {
    console.log('Internal configuration passes. This does not approve charging, signing credentials or Play publication.');
    console.log('Run node scripts/check-android-release.cjs --production for the separate owner/content release gate.');
  }
  if (issues.length) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { checkInternal, checkProduction, publicHttpsUrl, TEST_CERTIFICATE };
