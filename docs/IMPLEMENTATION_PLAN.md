# Product implementation plan (updated 6 November 2026)

Target: UK Theory Test Kit — independent, offline-first Android/iOS theory-test preparation, £0.99 one-time purchase, no ads or subscriptions.

## Why we are using release gates

A source file or CI configuration does not establish that the app works. Each phase below requires objective evidence before progressing to release. At launch the app must not misrepresent five sample questions as a full theory test.

## Phase 1 — Reliable build foundation (implemented; CI evidence required on merge)

- [x] Expo SDK 58 / React Native 0.88 and compatible TypeScript/Jest.
- [x] Remove invalid Expo config fields and add babel-preset-expo.
- [x] Expo Doctor, TypeScript checks and unit tests in GitHub Actions.
- [x] Bundling for iOS/Android.
- [x] Debug Android APK and iOS simulator jobs (both have passed on prior PR revision).
- [x] Commit a reproducible npm `package-lock.json`; convert install steps to `npm ci`.
- [ ] Install and launch on a physical Android phone; test offline start/resume and persistence.
- [ ] Install and launch on iOS simulator; capture automated UI test evidence.

**Acceptance:** all CI jobs green on the exact merge commit; both apps actually open; offline persisted data survives restart.

## Phase 2 — Offline mock-exam workflow (engine and UI implemented in this PR)

- [x] Pure, tested 57-minute / 50-question exam engine with 43/50 pass threshold.
- [x] Six-minute / five-question **sample**, explicitly labelled non-predictive; original practice bank expanded to **50 source-referenced questions** on the next feature branch.
- [x] Answer changes, flags, navigation, jump-to-question and expiry.
- [x] User-confirmed submit, timeout handling and result review.
- [x] SQLite session snapshots, resume and historical attempt storage.
- [x] Block full mock until the question count and video-case-study requirement are met.
- [ ] SQLite integration test on a native device and forced app termination/resume test.
- [ ] Review bug resilience: lost storage, changing question banks, device clock jumps.
- [ ] Accessibility and dynamic text scaling checks.

**Acceptance:** repeated navigation does not change scoring; mock can resume after app restart and without internet; expired exams cannot accept answers.

## Phase 3 — Complete independent editorial content (major outstanding work)

- [ ] Author, fact-check, copyedit and source-reference **950 additional** original questions (50 drafted; target at least 1,000) across car theory topics.
- [ ] Include reviewed local silent video case studies and their three linked questions; check their use in the 50-question exam selector.
- [x] First 24 simplified vector signs and 10-question recognition quizzes implemented; [ ] complete 150 official-accurate signs and finalize OGL attribution.
- [ ] Create 14 original hazard perception practice clips per full simulation (one double-hazard clip), accurately timed hazard windows and separate 44/75 pass criteria.
- [ ] Add separate structured hazard perception preparation and practice.
- [ ] QA each question with a second check against current Highway Code and actual legislation/official guidance.
- [ ] Keep a clear independent-brand disclaimer and avoid copying DVSA-licensed revision content.

**Acceptance:** zero placeholder content in a full mock, each correct answer independently checked, original/video licensing and attribution recorded.

## Phase 4 — Store release and economics

- [ ] Research brand naming conflicts and storefront keywords.
- [ ] Add polished icon, screenshots, store copy, privacy notice, content disclaimers.
- [ ] Set proper version codes and production signing for Play Store and App Store.
- [ ] Physical-device Android/iPhone tests and offline media playback tests.
- [ ] Size and performance audits (especially bundled video content).
- [ ] Confirm current minimum platform SDKs and both stores' submission policies.
- [ ] Recheck £0.99 after developer-fee/store commissions, taxes, refunds and customer-acquisition economics.
- [ ] Submit only when QA evidence and store policies are satisfied.

**Acceptance:** both store approvals and a documented post-launch support/update process.

## Product boundaries

- A complete UK app should check Northern Ireland's DVA-specific material separately from Great Britain's DVSA rules.
- Independent original questions are *practice*, never claim to be exact official exam questions.
- A single app installation must work without internet access, including all bundled media, questions, answers and progress.
- A full mock's multiple-choice pass alone must not be represented as a pass of the whole theory test: hazard perception is scored separately.
- Offline SQLite remains on device; deleting/reinstalling the app may erase local history unless explicit backup/export is built.

## Ongoing QA checklist

1. `npm ci` + Expo diagnostics + TypeScript + Jest.
2. Compile Android APK and iOS simulator app.
3. Complete sample mock, change answers, flag, navigate, submit and review score.
4. Start mock, force-stop app, relaunch offline; answers/flags/time remaining preserved.
5. Start mock, change device time/resume and verify expiry against the intended wall-clock policy.
6. Validate poor-network and airplane-mode behavior throughout.
7. Check screen readers, touch targets, text sizing and low-end Android performance.
8. All release content and copyrights reviewed.
