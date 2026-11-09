// The review route is hidden in ordinary release builds. Keep this fallback
// free of draft imports so Metro can exclude the full-resolution master pack.
export default function ImageReviewUnavailable() {
  return null;
}
