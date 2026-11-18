# Android paid-MVP content and editorial evidence — 18 November 2026

The current product is an independent, offline Great Britain car-theory course and revision app. Its **309 original questions**, **38 lessons**, **three original video animations**, learning illustrations and **30 road-sign notes/quizzes** remain pending independent human review. This document supersedes the historical 200-question, text-first MVP audit; that older drafting milestone was never paid-release approval.

The selected product scope is a £0.99 one-time Android purchase with all included learning content, no account, no advertising and no subscription. The current work prepares that MVP; it does not authorize publishing, charging users, production signing or merging into main. iOS work is outside this phase.

## Current review scope

| Category | Current entries | Independently approved | Source decision sheet |
| --- | ---: | ---: | --- |
| Questions | 309 | 0 | [Question tracker](QUESTION_REVIEW_TRACKER.csv) |
| Lessons | 38 | 0 | [Lesson tracker](LESSON_REVIEW_TRACKER.csv) |
| Original video case studies | 3 | 0 | [Video tracker](VIDEO_REVIEW_TRACKER.csv) |
| Learner image presentations | 91 | 0 | [Image tracker](IMAGE_REVIEW_TRACKER.csv) |
| Road-sign notes and quizzes | 30 | 0 | [Sign-note tracker](SIGN_NOTE_REVIEW_TRACKER.csv) |
| **Total decision records** | **471** | **0** | [Human review pack](reviewer-pack/README.md) |

The 91 image entries are logical presentations, including aliases, captions and neutral descriptions. They refer to **85 distinct PNG files**: the 52 selected project images, 30 DfT images and three retained starter images. Together with the three videos, the review manifest identifies 88 distinct media files by SHA-256. The 69 unselected project-artwork drafts are excluded from learner-content review and the learner build. Selection is not approval.

The question bank is the retained 228 records plus 72 questions addressing course gaps and nine linked video questions. All 300 ordinary questions have a lesson mapping. The additional sign-note quizzes are separate assessed material and therefore have their own review records.

## What the mechanical gates prove

`node scripts/check-mvp-content.cjs` checks question structure: at least 200 distinct questions, at least ten topics, ten per topic, four distinct options, a valid answer index and inspectable source/reference fields. Its success says nothing about legal accuracy, suitable distractors, originality or completeness.

`node scripts/check-editorial-review.cjs` independently rebuilds a catalogue from the current bundled TypeScript data and actual PNG/MP4 bytes. It requires a matching decision record for **all five categories**, an explicit `APPROVED` status, a non-empty named reviewer and a real UTC calendar date that is not in the future. It currently exits **1 / NOT READY** because all 471 decisions are pending.

`--report-only` reports exactly the same unresolved state but exits 0 for internal development builds. Green development CI is not commercial editorial sign-off. No command in this workflow creates human approval, uploads an app or publishes anything.

The static readers do not execute data modules. Unsupported calls/imports fail rather than running arbitrary TypeScript. The review reader only resolves static const data, named local imports and bundled PNG/MP4 references within the expected source roots.

## Approvals are bound to the content actually reviewed

Every tracker row contains `content_sha256`. Question fingerprints include the complete prompt, choices, correct index, explanation, topic/difficulty, reference, source URL and image/video identifiers. They also include the resolved question/review images, captions, neutral descriptions and actual media SHA-256 values. A new teaching-image mapping therefore changes the relevant fingerprint even if the question text is unchanged.

Lesson fingerprints include all objectives, sections, scenarios, recaps, sources, content versions and question mappings, together with linked question fingerprints and actual linked images/videos. A changed answer or teaching image invalidates the dependent lesson approval as well. Video, image and sign-note records cover their complete bundled metadata/content and associated media. Changing bytes while retaining a filename or logical ID cannot reuse the old approval.

Fingerprints are an evidence control, not proof that someone reviewed an item. Reviewer independence, factual judgement, commercial rights and the final owner release decision still require real human work. Never copy hashes or reviewer names into an approval merely to make the gate pass.

## Human review package and procedure

[Open the reviewer pack](reviewer-pack/README.md). It contains complete original app text, choices and correct answers, lesson teaching/scenarios/recaps, source links, media links, five decision sheets, a JSON catalogue and a media manifest. It links to primary sources rather than copying the licensed DVSA question bank or competitor content.

For **every item**, without sampling:

1. Open the cited primary source. Check that the current rule/sign supports the teaching and checked answer. Authoring-source checks recorded on 17 November are described in [the course review record](COURSE_CONTENT_REVIEW.md); this tooling update does not claim a new factual source review.
2. Verify legal MUST/MUST NOT versus advice, relevant exceptions, GB regional distinctions, unambiguous correct answers, realistic distractors and teaching-to-test fit. Review repeated or weak questions rather than approving them to reach a count.
3. Inspect each image and the complete videos for accurate UK traffic direction, timing, sign details, educational relevance, readable presentation, neutral unanswered descriptions and hidden answer captions. Review each sign-note quiz as well as its prose.
4. Check originality, commercial asset permission and required attribution against [asset licences](ASSET_LICENCES.md). Do not infer rights from a competitor APK or an attached source link.
5. Enter `NEEDS_CHANGES` with actionable notes for rejected material. Enter `APPROVED` only after actual independent review, with the reviewer’s name and UTC date (`YYYY-MM-DD`). Preserve the supplied content hash.
6. Return completed decision sheets to the owner. Amend app content in source, generate a new pack and re-review affected items. Run the strict gate before preparing a production upload. Passing it does not replace production signing, Play/privacy preparation, real-device checks or the owner's release decision.

## Generate or refresh a review copy

```sh
node scripts/export-editorial-review.cjs --refresh-trackers
node scripts/export-editorial-review.cjs --output PATH --copy-media
node scripts/check-editorial-review.cjs
```

The first command refreshes source tracker hashes and `docs/reviewer-pack`. It preserves unchanged recorded decisions and comments, resets changed/unbound approvals to pending, clears the stale reviewer/date and records why a previous approval was invalidated. It never promotes a pending record. The second command produces a standalone folder with the exact media files; without `--refresh-trackers`, it does not change source decision sheets.

The strict gate currently failing is expected. Content must remain marked pending until a named independent human completes this work. The app is independent revision, not the licensed DVSA bank, complete Highway Code, hazard-perception simulator or Northern Ireland-specific course; the paid listing must communicate those limits accurately.
