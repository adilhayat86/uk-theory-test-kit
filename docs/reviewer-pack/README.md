# Android paid-MVP editorial review pack

This is a concrete review copy of the bundled original app content, not an approval or a reproduction of the licensed DVSA question bank. The CSVs and manifest show recorded review status. Generating this pack never creates an approval. Do not mark rows approved merely because this export or CI succeeds.

Catalogue SHA-256: `3c7a2d66daab004095503091c90d17c9499c7356fb9cd08369840e2c57d2e745`.

## What to review

| Content | Entries | Reading copy | Record decisions |
| --- | ---: | --- | --- |
| question | 309 | [Read](questions.md) | [QUESTION_REVIEW_TRACKER.csv](QUESTION_REVIEW_TRACKER.csv) |
| lesson | 38 | [Read](lessons.md) | [LESSON_REVIEW_TRACKER.csv](LESSON_REVIEW_TRACKER.csv) |
| video | 3 | [Read](videos.md) | [VIDEO_REVIEW_TRACKER.csv](VIDEO_REVIEW_TRACKER.csv) |
| image | 91 | [Read](images.md) | [IMAGE_REVIEW_TRACKER.csv](IMAGE_REVIEW_TRACKER.csv) |
| sign-note | 30 | [Read](sign-notes.md) | [SIGN_NOTE_REVIEW_TRACKER.csv](SIGN_NOTE_REVIEW_TRACKER.csv) |

The image list includes logical aliases as separate presentation records. The manifest lists 88 distinct media files; aliases can share bytes, but captions, neutral accessibility wording and teaching context still need checking. Unselected artwork drafts are excluded.

## Source and licensing notes

- [ASSET_LICENCES.md](references/ASSET_LICENCES.md)
- [IMAGE_LIBRARY_REVIEW.md](references/IMAGE_LIBRARY_REVIEW.md)
- [content-sources.md](references/content-sources.md)
- [COURSE_CONTENT_REVIEW.md](references/COURSE_CONTENT_REVIEW.md)
- [QUESTION_BANK_EDITORIAL_AUDIT.md](references/QUESTION_BANK_EDITORIAL_AUDIT.md)

These are copies of the project’s existing evidence notes, identified by their own SHA-256 values in the manifest. They are not new legal/source approval. Some historical source-tree links in these notes may require the full repository; the content and media reading copies above are included in this export.


## Reviewer procedure

1. Review all questions, all lesson text/scenarios/recaps, the complete videos, every selected image/presentation and every sign note/quiz. Open the primary sources. Check legal MUST wording versus advice, GB regional differences, answer uniqueness, useful distractors, teaching-to-test fit and original-content/licensing attribution.
2. Check image/video timing, UK traffic direction, question relevance, answer-caption hiding, accessible descriptions and sufficient visual clarity. Media links refer to the existing source tree; export with --copy-media to make a standalone folder.
3. Enter APPROVED only after a real independent human review, with the reviewer’s name and UTC date (YYYY-MM-DD). Use NEEDS_CHANGES with actionable notes for rejected material. Do not modify content_sha256 to conceal a change.
4. Return the completed CSVs to the app owner. Source changes must be made in the app and a fresh pack generated. Changed text, answers, mappings, captions or media bytes invalidate the affected approvals; the refresh command retains comments and removes stale approval.
5. The owner copies reviewed records to docs/ and runs the strict editorial gate. A passing record gate verifies traceable matching evidence; it cannot prove that a human actually performed the review. Production signing, store/privacy setup and the separate owner release decision remain necessary.

## Commands

`node scripts/export-editorial-review.cjs --refresh-trackers` refreshes current hashes, preserves unchanged recorded decisions and resets changed approvals to pending. It never creates an approval.

`node scripts/export-editorial-review.cjs --output PATH --copy-media` exports a standalone review folder with the exact media bytes. Source decision sheets change only when --refresh-trackers is supplied.

`node scripts/check-editorial-review.cjs` strictly checks all five current content categories. `--report-only` reports the same unresolved review without blocking an internal development build. Neither command publishes an app.
