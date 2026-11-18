const { applyReleaseSigning } = require('./withAndroidReleaseSigning');

test('repeated prebuild does not duplicate production signing configuration', () => {
  const initial = 'android { buildTypes { release { signingConfig signingConfigs.debug } } }\n';
  const configured = applyReleaseSigning(initial);
  expect(applyReleaseSigning(configured)).toBe(configured);
  expect(configured.match(/signingConfigs\.create\('mvpUpload'\)/g)).toHaveLength(1);
});

test('requires an explicit production channel and every owner credential before overriding release signing', () => {
  const configured = applyReleaseSigning('android {}');
  expect(configured).toContain("if (System.getenv('ANDROID_BUILD_CHANNEL') == 'production')");
  expect(configured).toContain("if (System.getenv('EXPO_PUBLIC_IMAGE_REVIEW') != 'false')");
  for (const variable of ['ANDROID_UPLOAD_KEYSTORE_PATH', 'ANDROID_UPLOAD_STORE_PASSWORD',
    'ANDROID_UPLOAD_KEY_ALIAS', 'ANDROID_UPLOAD_KEY_PASSWORD']) {
    expect(configured).toContain(variable);
  }
  expect(configured).toContain("throw new GradleException('Missing production signing variable: '");
  expect(configured).toContain('if (!uploadStore.isFile())');
  expect(configured).toContain("android.buildTypes.release.signingConfig = android.signingConfigs.getByName('mvpUpload')");
});
