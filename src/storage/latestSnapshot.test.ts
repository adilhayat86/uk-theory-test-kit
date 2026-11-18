import { createLatestSnapshotLoader } from "./latestSnapshot";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}

test("a slow answer refresh cannot erase a bookmark committed and refreshed later", async () => {
  type Snapshot = { bookmarks: string[]; attempts: number };
  const beforeBookmark = deferred<Snapshot>();
  const afterBookmark = deferred<Snapshot>();
  const read = jest.fn().mockReturnValueOnce(beforeBookmark.promise).mockReturnValueOnce(afterBookmark.promise);
  const loader = createLatestSnapshotLoader<Snapshot>(read);
  let visible: Snapshot = { bookmarks: [], attempts: 0 };
  const answerRefresh = loader.load().then(snapshot => { if (snapshot) visible = snapshot; });
  loader.invalidate();
  visible = { ...visible, bookmarks: ["oil-warning"] };
  const bookmarkRefresh = loader.load().then(snapshot => { if (snapshot) visible = snapshot; });
  afterBookmark.resolve({ bookmarks: ["oil-warning"], attempts: 1 });
  await bookmarkRefresh;
  beforeBookmark.resolve({ bookmarks: [], attempts: 1 });
  await answerRefresh;
  expect(visible).toEqual({ bookmarks: ["oil-warning"], attempts: 1 });
});

test("reset invalidates an old read even before another refresh has completed", async () => {
  const old = deferred<{ attempts: number }>();
  const loader = createLatestSnapshotLoader(() => old.promise);
  const pending = loader.load();
  loader.invalidate();
  old.resolve({ attempts: 20 });
  await expect(pending).resolves.toBeNull();
});

test("a failed read is retryable and cannot poison later snapshots", async () => {
  const read = jest.fn().mockRejectedValueOnce(new Error("Temporary read failure")).mockResolvedValueOnce({ attempts: 3 });
  const loader = createLatestSnapshotLoader<{ attempts: number }>(read);
  await expect(loader.load()).rejects.toThrow("Temporary read failure");
  await expect(loader.load()).resolves.toEqual({ attempts: 3 });
});
