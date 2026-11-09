# Integration QA notes

The physically tested 200-question feature branch was combined with eight independently written image-recognition questions, yielding 208 unique question IDs and 11 image-linked questions. Existing search, offline storage, mock, practice, accessibility fixes and Android release workflow derive from the tested branch.

**Editorial approval:** 0/208 approved. The eight new questions have source URLs and individual PENDING_INDEPENDENT_REVIEW tracker records. Automated checks are not content accuracy certification.

**Device QA:** The 6 November Samsung test report applies to the earlier 200-question APK, not this combined 208-question illustrated build. Reinstall the newly generated offline APK and verify images, offline operation, resume, large text and accessibility.

**Release blockers:** editorial review, hazard perception, production signing and broader device testing.

**9 November continuation:** The 121-image v7-1 draft pack is now imported separately with its manifest, review tracker and static source registry. Drafts are available only through the internal artwork review flow, not as question bindings. Existing illustrated questions no longer show meaning captions before answering; flashcards, answer review and selected sign notes now display their diagrams. See [current artwork findings and device checks](IMAGE_LIBRARY_REVIEW.md).
