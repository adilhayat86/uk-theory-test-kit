# UK Theory Test Kit

An independent, offline Great Britain car theory revision app built with Expo, React Native, TypeScript and SQLite. Android learner MVP **0.2.1**, versionCode **3**. Not affiliated with DVSA.

## Included in the MVP

- 208 original questions across 12 topics, with four choices, explanations and primary-source references.
- Practice setup: 5, 10 or 20 questions, multiple topics and all / smart / incorrect / not-tried / saved filters.
- Smart revision prioritises recent mistakes and unseen questions using local history.
- Crash-safe practice resume, saved answers, bookmarks, result review and retry mistakes.
- 30 illustrated road-sign notes with search, categories, saved signs and a shuffled 10-question recognition quiz.
- 30 openly licensed DfT sign illustrations and nine original answer-explanation diagrams, all bundled offline. Teaching diagrams stay hidden until answering or revealing a flashcard.
- Topic flashcards, question search and local progress by topic.
- Timed five-question practice (six minutes), changeable answers, flags, question navigation, offline resume and result history.
- No account, ads or subscription.

The target store product remains a one-time £0.99 Android app. Human editorial sign-off, production signing and store submission remain outstanding. This is an installable test MVP, not a published commercial release.

## Scope

Great Britain car revision. No licensed DVSA question bank, full Highway Code book, Northern Ireland bank, hazard-perception videos or full official-style exam simulation. A future full-exam engine is tested separately but is not exposed as an available MVP feature.

See the [MVP implementation and phone competitor audit](docs/MVP_IMPLEMENTATION_2026-11-10.md), [release target](docs/MVP_RELEASE_TARGET.md), and [asset sources and licences](docs/ASSET_LICENCES.md). No competitor code or media is included.

## Navigation

The main tabs are **Home, Practice, Signs, Saved and Progress**. Practice opens the session setup directly. Home shows quick practice, signs, flashcards and timed practice in a compact dashboard. Search is available in the header.

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

Ordinary learner exports contain 42 PNGs (about 1.6 MiB). Set `EXPO_PUBLIC_IMAGE_REVIEW=false`. Verify an export with:

```sh
node scripts/check-export-assets.cjs dist/android android learner
```

The separate internal artwork-review export uses `EXPO_PUBLIC_IMAGE_REVIEW=true` and Home → Artwork review. It includes all 121 draft images and their unchanged review tracker, adding roughly 146 MiB. The normal learner bundle includes only the nine selected original diagrams from this pack and excludes the other 112. Selection is not human editorial approval. Restart Metro when changing the flag.

Source SVGs, hashes, licensing and PNG dimensions for DfT images are retained under `src/assets/dft-signs/`. No network downloads are needed during study.
