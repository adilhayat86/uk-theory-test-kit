# Driving Theory Test UK: Learn — Android paid MVP

Android-only, offline Great Britain car-theory revision. Current internal MVP candidate: **0.8.0 / Android code 11**. The agreed model is a **one-time paid download with everything included**, no adverts, subscriptions, in-app purchases or account. Initial UK price target: £0.99; final regional prices are set in Google Play. Support: **adilhayatkamker@gmail.com**.

## The learning journey

- **Learn:** 38 original lessons across 15 topics, with explanations, illustrated examples, recaps and source references. Explicit study confirmations and reading positions are saved locally.
- **Check understanding:** each topic has a dedicated 10-question check, passing at 8/10 after its lessons are studied. Ordinary practice and exam self-confirmation never complete lessons.
- **Revise:** recent mistakes from practice and mock exams lead back to relevant lessons and targeted questions. Newer correct answers clear older mistakes. Learn keeps the course as its primary next step; saved practice is secondary.
- **Exams:** 50 questions, 57 minutes, practice pass at 43 correct. Each full mock includes three questions on one of three original silent video cases. Direct access requires an explicit study confirmation for each new attempt. Five-question warm-ups remain available.
- **Review and progress:** mock results separate wrong and unanswered questions, offer bounded answer review, topic feedback, lesson links and targeted practice. Reading, topic checks, question coverage and exam results remain distinct.
- **Study tools:** 309 questions, 30 illustrated sign notes and quiz, flashcards, search and saved items. Question images hide answer captions before answering.
- **Help and control:** offline privacy/about information, support email and an explicit confirmed reset. Startup read failures show Retry instead of silently replacing existing work with an empty session.

All learning content is bundled offline. External source/licence links and email support use other apps and need the relevant connection. No hazard-perception simulator, Northern Ireland-specific course or licensed DVSA question bank is included. Independent revision does not guarantee an official test pass.

## Development and checks

Use Node.js 22.13 or later in the Node 22 line.

```sh
npm ci
npm run check:android
npm run doctor
npm run typecheck
npm test
npm run check:mvp:content
npm run check:mvp:editorial -- --report-only
npm run export:android
node scripts/check-export-assets.cjs dist/android android learner
```

`npm run check:release` is the separate strict paid-publication gate. It intentionally fails while independent content approval, publisher identity, published privacy URL or owner signing credentials are missing. An internal APK is never evidence of permission to charge or publish.

The review catalogue binds approval to exact content and media hashes across questions, lessons, videos, learning-image presentations and sign notes. Changing an answer, explanation, lesson or linked asset invalidates stale approval. All actual reviewer rows remain pending. Prepare the human review handoff with:

```sh
npm run export:review -- --output /path/to/reviewer-pack --copy-media
```

See [content review](docs/COURSE_CONTENT_REVIEW.md), [current MVP scope](docs/MVP_RELEASE_TARGET.md), [asset licences](docs/ASSET_LICENCES.md), [Android release guide](release/README.md) and [store listing draft](release/PLAY_LISTING_DRAFT.md).

## Android packaging

CI runs Android configuration checks, TypeScript, tests, an Android learner export and a standalone release-mode test APK/AAB. **No iOS export or native build is run in this phase.**

The default learner build uses `EXPO_PUBLIC_IMAGE_REVIEW=false`: 52 selected project learning images plus the DfT signs, original diagrams and branding are bundled. The 69 unselected draft masters and the internal My images gallery are excluded. A separate opt-in workflow export retains the complete artwork-review tool for internal work.

Native verification checks the actual APK: app version/package, test or owner certificate, embedded lessons/questions/videos, selected/unselected image pixels, permissions, backup exclusions, 16 KB native-library/ZIP alignment and offline JavaScript. Storage, overlay and vibration permissions are blocked. Cloud backup and device transfer of study data are explicitly disabled; the app does not promise cross-phone progress recovery.

The internal APK uses the existing development certificate for Samsung updates. The CI AAB is inspection-only. Production signing is a guarded separate channel using owner environment variables; no upload key or credentials belong in source control. Prepared privacy HTML is local under `release/privacy/`; it has not been published.
