# Roadstep

An independent, offline Great Britain car theory revision app built with Expo, React Native, TypeScript and SQLite. Progress-first test update **0.5.0**, versionCode **7**. Not affiliated with DVSA.

## Included in the MVP

- 228 original questions across 13 topics, with four choices, explanations and primary-source references. All original 208 question records are preserved.
- A progress-first Home with question coverage, correct-last-try/revisit/unseen counts, recommended next sessions and actionable topic focus areas.
- Central Progress tab with a learning route, per-topic coverage, separate historical accuracy and real timed-check history. No fabricated test-readiness score.
- Home → Picture practice starts up to 10 illustrated questions. Learn also offers a Picture questions filter and the Dashboard warnings topic.
- Practice setup: 5, 10 or 20 questions, multiple topics and all / pictures / smart / incorrect / not-tried / saved filters.
- Smart revision prioritises recent mistakes and unseen questions using local history.
- Crash-safe practice resume, explicit session discard without deleting answer history/bookmarks, result review and retry mistakes. Finished practice links back to shared progress.
- 30 illustrated road-sign notes with search, categories, saved signs and a shuffled 10-question recognition quiz.
- 30 openly licensed DfT sign illustrations and 52 selected original project images, all bundled offline. Labelled teaching scenes appear only after answering or revealing a flashcard; genuine image questions show uncaptioned technical illustrations. Twenty-one sign lessons also include original roadside examples.
- Topic flashcards, question search and local progress by topic.
- Timed five-question practice (six minutes), changeable answers, flags, question navigation, offline resume and result history.
- No account, ads or subscription.

The target store product remains a one-time £0.99 Android app. Human editorial sign-off, production signing and store submission remain outstanding. This is an installable test MVP, not a published commercial release.

## Scope

Great Britain car revision. No licensed DVSA question bank, full Highway Code book, Northern Ireland bank, hazard-perception videos or full official-style exam simulation. A future full-exam engine is tested separately but is not exposed as an available MVP feature.

See the [MVP implementation and phone competitor audit](docs/MVP_IMPLEMENTATION_2026-11-10.md), [release target](docs/MVP_RELEASE_TARGET.md), and [asset sources and licences](docs/ASSET_LICENCES.md). No competitor code or media is included.

## Navigation

The main tabs are **Home, Learn, Progress, Signs and Saved**. Home shows your learning position and recommends a next step. Progress is the central destination for your learning route and topics. Learn opens practice setup; illustrated practice, signs, flashcards and timed checks remain available. Search is in the header.

See the [progress-first redesign and competitor review](docs/PROGRESS_FIRST_REDESIGN.md) and [Roadstep identity](docs/BRAND.md).

Topics open in a picker rather than a long list above the content. Back returns to the actual previous screen with its search, selections and position retained. The Android Back key closes the topic picker before leaving a screen. A saved practice session is resumed explicitly from Home.

See [navigation changes and validation](docs/NAVIGATION_2026-11-10.md).

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
