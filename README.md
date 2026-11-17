# Driving Theory Test UK: Learn

Independent, offline Great Britain car-theory study built with Expo, React Native, TypeScript and SQLite. Learning-first internal build **0.7.0**, Android code **10**. Not affiliated with DVSA.

## Learn, check, revise, then practise an exam

- **15 modules / 38 original lessons**: objectives, substantive teaching, worked road scenarios, selected illustrations/video examples, recaps and primary-source references.
- Explicit lesson-study confirmation and saved reading positions. Opening or scrolling a lesson does not complete it.
- Dedicated **10-question topic checks**, passing at **8/10**. Every lesson is represented. Topic completion requires current lesson confirmations and a compatible passed check; ordinary question practice does not award course completion.
- **309 original questions across15topics**: the previous228 records are unchanged, with72 questions for curriculum gaps and9 linked video questions added. Questions include four choices, an explanation and a primary rule reference.
- **Full multiple-choice practice mocks:50questions/57minutes/43correct**, with47ordinaryquestions sampled across topics and3linkedquestions about one of3original silent20-second video case studies. Five-question warm-ups remain available.
- Direct exam access requires a fresh explicit study acknowledgement for each new attempt. That confirmation never marks lessons or topic checks complete. Saved attempts retain their acknowledgement, answers, flags, position and absolute timer.
- Distinct lesson, topic-check, revision-coverage and mock-result progress. Mistakes link to relevant learning material. No invented official pass-readiness percentage.
- Study tools:30illustrated sign notes and quiz, flashcards, search, saved questions and smart/picture/topic revision. Search begins with an empty prompt rather than dumping the entire bank.
- Four primary tabs: **Learn, Practise, Exams, Progress**. Study tools are secondary. Only lessons/active answering use focused navigation; exam overview and results retain main navigation.
- All content and playable videos work offline. No account, advertising, subscription or remote progress server.

The animations are independently authored diagrams, notDVSAfootage. These mocks assess multiple-choice knowledge; there is no hazard-perception simulator. The course is selected independent revision, not a licensed copy of the fullHighwayCode or officialDVSAquestionbank, and it does not cover NorthernIreland-specific rules.

This remains an internal test build. A paid store release requires independent human editorial sign-off of questions, lessons and media, production signing and the separate publication checks. Structural tests and AI source checks do not constitute that approval.

See [learning model and scope](docs/LEARNING_COURSE_2026-11-17.md), [course/source review](docs/COURSE_CONTENT_REVIEW.md), [asset licences](docs/ASSET_LICENCES.md) and [original video authoring](src/assets/case-studies/README.md). Historical MVP/navigation documents describe earlier versions.

## Development

Use Node.js 22.13 or later in the Node 22 line.

```sh
npm ci
npm run doctor
npm run typecheck
npm test
npx expo start
```

Content checks:

```sh
npm run check:mvp:content
npm run check:mvp:editorial -- --report-only
```

Structural checks meet the 200-question / 10-topic minimum. They do not constitute independent human rule, source or originality approval. Editorial trackers remain pending; do not mark them approved automatically.

## Builds and offline artwork

GitHub Actions checks types, tests, Expo compatibility, Android/iOS exports, a standalone Android learner APK and an iOS simulator build. The standalone release-mode APK embeds JavaScript and works without Metro. Its development signing key is for device testing; the CI AAB is not a production Play upload.

Ordinary learner exports include the selected learning images, DfT signs and app branding. Set `EXPO_PUBLIC_IMAGE_REVIEW=false`. Verify an export with:

```sh
node scripts/check-export-assets.cjs dist/android android learner
```

The internal device-test APK and artwork-review export use `EXPO_PUBLIC_IMAGE_REVIEW=true` and include Home → My images for browsing the complete collection. All 121 original draft images are searchable and available offline, with previous/next navigation and optional image details. Their review status and tracker remain unchanged. Ordinary learner exports include 52 selected project images and exclude the remaining 69. Selection is not human editorial approval. Restart Metro when changing the flag.

See [illustrated-study mappings and sources](docs/ILLUSTRATED_STUDY_2026-11-16.md) for the 20 new questions, added teaching examples and held artwork.

Source SVGs, hashes, licensing and PNG dimensions for DfT images are retained under `src/assets/dft-signs/`. No network downloads are needed during study.
