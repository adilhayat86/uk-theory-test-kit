# Android MVP release target — independent GB car theory revision

Decision date: 6 November 2026

## Product promise

A **£0.99 one-time paid, ad-free, offline Android revision app** for
**Great Britain car learners**. No account, subscriptions, mobile data,
third-party analytics or in-app purchases required for study.

MVP positioning: **independent car theory revision**, not an official DVSA
app and not a full "4-in-1" mock test replacement. The working repository
name can remain while we settle a distinct Play Store title and approved
store metadata. Do not imply Great Britain content covers Northern Ireland.

## In-scope user journey

1. Install, open and start a 5- or 10-question mixed practice immediately.
2. Choose a topic or browse the original offline question bank.
3. See four answers; receive correct/incorrect feedback and the reason/rule.
4. Bookmark a question, search by wording/topic/rule, and return to it.
5. Finish practice and review all/correct/incorrect/saved, topic score and
   repeat incorrect questions only.
6. See attempt accuracy and topic coverage stored locally (SQLite).
7. Optional light extras already written: recall/reveal flashcards and
   **clearly labelled text-first** road-sign notes and mini quiz.
8. Optional short timed 5-question mini test; never advertise it as a
   full official-style 50-question exam or as a pass predictor.

## Deliberately NOT part of this MVP

- Full DVSA-style 50-question mock, unless the actual playable local silent
  video case-study and all requirements have been implemented and reviewed.
- Hazard-perception simulator, 14 clips, official scoring or clip downloads.
  A standalone informational guide is not sold as a simulator feature.
- Full Highway Code book / hundreds of illustrated road signs;
  a text-based starter set cannot be advertised as complete coverage.
- AI-generated-only question sets, rewording, chat, voiceover, gamification,
  pass-money-back guarantees, social features, leaderboards or ad placements.
- Northern Ireland-specific car questions, other vehicle types, iOS release.
- Logins, cloud backup, paid subscriptions and remote customer profiles.

## Minimum commercial content gate (required before charging)

**200 unique, independently authored, rule-checked questions** across
**at least 10 topics**, each topic with at least 10 questions. Each question
must have four distinct options, one checked answer, a useful explanation,
and a reliable rule/source reference.

Automated guard: run `npm run check:mvp:content`. This checks question
count, topic distribution and basic source/answer integrity; it **now passes the numeric/question-format gate for 200 authored questions**.
Independent human editorial sign-off remains incomplete and is a separate launch blocker. Run it in CI with
`npm run check:mvp:content -- --report-only` to exercise the script before
the bank is complete without hiding the unmet requirement.

This structural gate is **not** editorial approval. A second required release gate is `npm run check:mvp:editorial`, which validates the 200-row named-reviewer tracker and intentionally fails until all questions are independently approved. Two-person or
independent cross-check of answers against current Highway Code, sign
specifications and official guidance must be recorded for all questions.
Review date and source URL/rule number should be traceable before release.

## Android-specific launch exit checks

- CI green on final commit: npm ci, Expo Doctor, TypeScript, Jest, Android
  JS export, installable Android build; an iOS build is a nice-to-have,
  not the first-store launch blocker.
- Android signed **release AAB** and Play Console policy target verified,
  with correct app title, listing screenshots, category, support email
  and external privacy notice. Debug APK alone is NOT the release build.
- Install on a real Samsung/low-end Android device; launch with airplane
  mode, navigate, answer, bookmark, force-stop, relaunch and confirm SQLite
  progress/bookmarks are intact.
- Run 5/10-question practice, finish, review filters and retry errors;
  verify no double-counting or mixed answers after rapid taps.
- Test font scaling, TalkBack button semantics, portrait, Back navigation,
  scrolling on long questions and offline crashes.
- No copyright-infringing DVSA/competitor questions, videos, artwork,
  logos or trademarks. Review commercial licence requirements and any
  Open Government Licence attribution for sign/Highway Code assets.
- No unsupported "official", "complete", "pass guaranteed", "all DVSA
  questions" or hazard-perception claims in the listing.
- Separate manual approve-to-release decision after all evidence exists.

## Current status

**Implementation:** 200 questions have been drafted in the feature branch, with
source URLs and a per-question editorial tracker. Smart study, search,
bookmarks, flashcards, road-sign text preview and per-topic results exist. Automated CI / physical-device QA must
be verified for the exact final commit.

**Biggest gap:** all 200 questions require independent editorial verification,
realistic distractor review and Android device QA. The automated gate checks
structure only; it does not mean every answer is legally verified.

## Upgrade path only AFTER this MVP

1. Properly illustrated, licensed/attributed road-sign library and
   searchable, current Highway Code reader.
2. Full 50-question/57-minute mock with 3 silent video-case-study questions,
   accurate 43/50 multiple-choice pass criterion and offline playback.
3. Original or separately licensed hazard videos with supported tap/scoring
   and proper 44/75 criteria.
4. iOS build/QA and optional learner plan.

## Official rules and licensing evidence

- https://www.gov.uk/theory-test/multiple-choice-questions
- https://www.gov.uk/theory-test/pass-mark-and-result
- https://www.gov.uk/theory-test/hazard-perception-test
- https://www.gov.uk/guidance/make-and-sell-driving-theory-test-revision-products

The DVSA page says official revision questions and clips must not be
reproduced without permission; do not assume the competitor APK supplies
rights. Confirm commercial licensing implications with a qualified reviewer
before store publication. Highway Code/official sign content can be reused
subject to the applicable Open Government Licence conditions.

Review evidence: [200-question editorial audit](QUESTION_BANK_EDITORIAL_AUDIT.md) and [per-question review tracker](QUESTION_REVIEW_TRACKER.csv).
