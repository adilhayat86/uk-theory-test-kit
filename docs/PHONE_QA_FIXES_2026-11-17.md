# Phone QA fixes — 17 November2026

Thorough Samsung testing identified two issues in the progress-first test version:

- A completed practice session could not be reopened after visiting Progress or restarting. Home now exposes **Review last practice result** for a completed saved session, alongside the next-session and clear controls. Three regression tests cover completed, unfinished and absent sessions, including the resume callback.
- At font scale2.0, the timed-practice clock and remaining-time label extended beyond the card/screen, and the Progress navigation label broke after its final letter. The timer now reflows its clock area onto another row when required. Timed history text can shrink/wrap, navigation uses a slightly smaller base label size at large-font settings while retaining system scaling, and practice topic/bookmark rows and answer-letter badges can grow with text.

The changes preserve the database schema, question content, answer scoring and timing model. Device rechecks on the final APK must verify completed-result reopening and200% layouts. Full test evidence, deliberate test answers and restored phone settings are recorded in the workspace QA report rather than publishing personal study data here.
