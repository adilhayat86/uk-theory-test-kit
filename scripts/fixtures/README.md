# Android verifier output fixtures

Captured on 18 November 2026 using the actual Android Build Tools **37.0.0** `aapt2` executable.

- `aapt2-37-badging.txt`: identity and SDK lines captured from the existing internal 0.7.0/code 10 APK. This records the real `minSdkVersion` label, which differs from older `sdkVersion` output.
- `aapt2-37-local-data-*.txt`: real decoded outputs from a tiny resources-only `com.example.theory` fixture, version 0.8.0/code 11, minimum API 24 and target API 36. Its application explicitly disables backup/debug/cleartext, references the app's generated local-data rules, and declares only wake-lock permission.

The local-data fixture was compiled and linked using SDK 37 `aapt2` against the installed Android 36 framework (`android.jar`). All used backup attributes are available there. `aapt2 optimize --shorten-resource-paths` was then applied before dumping badging, manifest, permissions, resources and the referenced backup XML. The tests exercise the actual binary-XML decoder format and shortened resource filename, rather than an invented textual representation.

The backup XML came directly from `plugins/withAndroidLocalData.js`. The fixture excludes all nine storage domains in both cloud and device-transfer sections. Tests read these text captures without Android tooling or Pillow; the native CI job separately checks the real complete APK.

No fixture APK or signing material is committed. These text fixtures do not represent an installable learner build, a production certificate or release approval.
