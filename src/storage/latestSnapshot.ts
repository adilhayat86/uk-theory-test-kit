/** Prevent an older, slower read from replacing a newer mutation or refresh. */
export function createLatestSnapshotLoader<T>(read: () => Promise<T>) {
  let revision = 0;
  return {
    invalidate() { revision += 1; },
    async load(): Promise<T | null> {
      const request = ++revision;
      const snapshot = await read();
      return request === revision ? snapshot : null;
    },
  };
}
