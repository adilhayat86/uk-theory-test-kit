# Offline learner MVP â€” 10 November 2026

## Competitor observation

Inspected Driving Theory Test 4 in 1 Kit on the connected Samsung SM-S918U, package `uk.co.focusmm.DTSCombo`, version 4.8.8 (1726). The phone was configured for the Northern Ireland car bank. This does not establish the competitor's Great Britain question count.

Observed revision category selection with answered/correct/total counts, all/smart/incorrect/unseen/flagged filters, question search, progress and mock-test entry points. Road signs are grouped by category with descriptions, actions, previous/next navigation and flags. Highway Code study has a searchable chapter list and bookmarks. Screenshots remain outside the repository for private reference. No competitor questions, media, code or branding were copied. No competitor quiz answers or bookmarks were changed.

## Implemented MVP

- 208 original GB questions; stable IDs, answers and SQLite schema retained.
- Practice setup with 5/10/20 questions, multiple topics and all/smart/incorrect/not-tried/saved filters. Smart mode ranks recent mistakes before unseen questions. Empty selections cannot start an unrelated session.
- 30 illustrated road-sign notes, search/categories, expandable details, saved signs and a fresh 10-question recognition quiz.
- 30 offline DfT sign illustrations with source SVGs, provenance, hashes and licence attribution. Six old question-image IDs now resolve to sharper diagrams.
- Nine original teaching diagrams for answer explanations and flashcard reveals, hidden before answering. The other 112 draft images remain outside the learner build.
- Fixed the home topic heading; practice navigation opens setup; the timed tab describes the available short practice accurately.
- Learner APK version 0.2.0, Android versionCode 2. Gallery-only artwork remains in a separate internal review export.

## Release status

This test MVP is for independent GB car revision. It does not include the licensed DVSA bank, full Highway Code book, NI bank, full official-style mock or hazard-perception videos. Human editorial sign-off and production signing remain separate release requirements. Existing editorial trackers remain pending.

## Validation completed

- TypeScript and all 60 tests passed locally. All four [Mobile CI jobs](https://github.com/adilhayat86/uk-theory-test-kit/actions/runs/42700272089) passed for code commit `31a49e904b05b354af996d5fb61b0547fca65594`.
- The standalone [APK artifact](https://github.com/adilhayat86/uk-theory-test-kit/actions/runs/42700272089/artifacts/13712391114) is 75,582,664 bytes. SHA-256: `744ce18f00ed3b9d7e533c7336af4be35fb5e54a7fc52eb75e260cd00106bf76`. It contains the offline JavaScript bundle and all 42 expected images, verified by decoded pixels; 112 unselected draft images are absent.
- Development signing certificate matches the installed app. Data-preserving installation of version 0.2.0/code 2 succeeded on Samsung SM-S918U, Android 16.
- Airplane mode/Wi-Fi-off checks passed: cold launch, 5/10/20 setup, local saved/mistake/unseen counts, sign search, illustrated details, full 10-question sign quiz and correct 10/10 result, and a teaching image revealed on a vehicle-safety flashcard.
- Existing 38 unique questions, 41 attempts, 12 correct, one bookmark and five-answer completed practice result remained unchanged. No new scored theory attempts were submitted during these checks; practice selection/session logic is covered by domain tests.
- Original Airplane mode, Wi-Fi, Bluetooth and mobile-data settings were restored. Screenshots, JSON reports, APK and backup are retained locally on G: under the MVP build folder. The app is left on Home.

Human editorial approval, production signing, store listing, TalkBack and wider device/font-size QA remain outside this completed test build.

