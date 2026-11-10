# Offline 121-image integration — staged, not activated

The full image overlay was generated and SHA-256 validated on 10 November 2026. This feature branch contains a guarded activation script, not the 121 PNG binaries. Main remains unaffected.

## Import the prepared overlay

Download uk-theory-121-image-integration-overlay.zip from the ChatGPT conversation. It contains 121 PNGs under src/assets/illustrations-v2, a literal Metro require registry (src/data/illustrationLibrary.ts), a gallery (src/components/IllustrationGallery.tsx), a checksum manifest, and verification script.

From a checkout of this feature branch:

```bash
unzip uk-theory-121-image-integration-overlay.zip -d /tmp/theory-overlay
cp -R /tmp/theory-overlay/src/* src/
cp -R /tmp/theory-overlay/docs/* docs/
cp /tmp/theory-overlay/scripts/verify-illustration-library.py scripts/
python3 scripts/verify-illustration-library.py
python3 scripts/activate-illustration-gallery.py
npm ci
npm run typecheck
npm test
npm run check:mvp:content
```

Do not merge until all binary images are committed, TypeScript, Jest and Android CI pass, and an Android offline build is checked on a device. The 121 new illustrations remain DRAFT_REVIEW_REQUIRED and must not be inserted into scored questions automatically. Existing 208 questions and SQLite state must remain unchanged.

The ChatGPT working container cannot directly upload 150 MB of binary assets through the GitHub text-file connector; the overlay ZIP needs to be applied using a local git checkout.