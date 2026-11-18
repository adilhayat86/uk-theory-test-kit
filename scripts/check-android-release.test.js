const { checkInternal, checkProduction, publicHttpsUrl, TEST_CERTIFICATE } = require('./check-android-release.cjs');
const app = require('../app.json').expo;
const release = require('../release/android-release.json');

test('internal Android MVP has a complete privacy and purchase contract', () => {
  expect(checkInternal(app, release)).toEqual([]);
  expect(checkInternal({ ...app, platforms: ['android', 'ios'] }, release)).toContain('This MVP must enable Android only');
  const changed = { ...app, android: { ...app.android, allowBackup: true, blockedPermissions: [] } };
  expect(checkInternal(changed, release)).toContain('The local-only MVP must explicitly disable progress backup');
  expect(checkInternal(changed, release).filter(issue => issue.startsWith('Block unused permission:'))).toHaveLength(4);
});

test('a configured internal MVP is not mistaken for a publishable paid release', () => {
  const issues = checkProduction(release, {});
  expect(issues).toContain('Publisher has not selected production-candidate status');
  expect(issues).toContain('Publisher legal identity is not configured');
  expect(issues).toContain('A real public HTTPS privacy-policy URL is not configured');
  expect(issues).toContain('Missing owner signing variable: ANDROID_UPLOAD_KEYSTORE_PATH');
});

test('production needs the owner certificate and cannot silently fall back to test signing', () => {
  const candidate = { ...release, status: 'production-candidate', publisherLegalName: 'Test publisher',
    privacyPolicyUrl: 'https://privacy.company.co.uk/app', uploadCertificateSha256: TEST_CERTIFICATE };
  const environment = { ANDROID_BUILD_CHANNEL: 'production', EXPO_PUBLIC_IMAGE_REVIEW: 'false', ANDROID_UPLOAD_KEYSTORE_PATH: '/private/upload.jks',
    ANDROID_UPLOAD_STORE_PASSWORD: 'test-value', ANDROID_UPLOAD_KEY_ALIAS: 'upload', ANDROID_UPLOAD_KEY_PASSWORD: 'test-value' };
  expect(checkProduction(candidate, environment, () => true)).toContain('Record the owner upload certificate; the development certificate cannot be used');
  expect(checkProduction({ ...candidate, uploadCertificateSha256: 'a'.repeat(64) }, environment, () => false))
    .toContain('Owner upload keystore is unavailable');
  expect(checkProduction({ ...candidate, uploadCertificateSha256: 'a'.repeat(64) }, environment, () => true)).toEqual([]);
});

test('placeholder, local or insecure privacy URLs cannot clear production preflight', () => {
  for (const url of [null, 'http://publisher.test/privacy', 'https://example.com/privacy',
    'https://127.0.0.1/privacy', 'https://192.168.0.5/privacy', 'https://a.local/privacy',
    'https://publisher.test/privacy', 'https://example.com./privacy',
    'https://name:password@privacy.company.co.uk/app']) expect(publicHttpsUrl(url)).toBe(false);
  expect(publicHttpsUrl('https://privacy.company.co.uk/app')).toBe(true);
});
