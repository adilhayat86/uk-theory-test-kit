import { roadSigns, roadSignCategories } from './roadSigns';

describe('offline road-sign content', () => {
  it('includes unique, source-referenced signs across three categories', () => {
    expect(roadSigns.length).toBeGreaterThanOrEqual(20);
    expect(new Set(roadSigns.map((item) => item.id)).size).toBe(roadSigns.length);
    expect(new Set(roadSigns.map((item) => item.artwork)).size).toBe(roadSigns.length);
    expect(new Set(roadSigns.map((item) => item.label)).size).toBe(roadSigns.length);
    for (const item of roadSigns) {
      expect(roadSignCategories).toContain(item.category);
      expect(item.artwork.trim().length).toBeGreaterThan(3);
      expect(item.meaning.trim().length).toBeGreaterThan(15);
      expect(item.tip.trim().length).toBeGreaterThan(10);
      expect(item.sourceUrl).toMatch(/^https:\/\/www\.gov\.uk\//);
    }
    for (const category of roadSignCategories) {
      expect(roadSigns.filter((item) => item.category === category).length).toBeGreaterThanOrEqual(3);
    }
  });
});
