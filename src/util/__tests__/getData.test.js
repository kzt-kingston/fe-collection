import { describe, it, expect } from "vitest";
import getData, { REGISTRY, searchForData } from "@/util/getData";

describe("REGISTRY", () => {
  it("has at least one entry", () => {
    expect(REGISTRY.length).toBeGreaterThan(0);
  });

  it("every entry has a name and a websites array", () => {
    for (const entry of REGISTRY) {
      expect(typeof entry.name).toBe("string");
      expect(entry.name.length).toBeGreaterThan(0);
      expect(Array.isArray(entry.websites)).toBe(true);
    }
  });

  it("names are unique", () => {
    const names = REGISTRY.map((e) => e.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("includes the core programming languages", () => {
    const names = REGISTRY.map((e) => e.name);
    for (const lang of ["HTML", "CSS", "JavaScript", "TypeScript", "Vue", "React"]) {
      expect(names).toContain(lang);
    }
  });
});

describe("getData(language, type)", () => {
  it('returns both websites and videos when type is "%"', () => {
    const data = getData("HTML", "%");
    expect(Array.isArray(data.websites)).toBe(true);
    expect(Array.isArray(data.videos)).toBe(true);
  });

  it("returns websites for a programming language", () => {
    const data = getData("React", "websites");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns videos for a programming language", () => {
    const data = getData("React", "videos");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns null for an unknown language", () => {
    expect(getData("Klingon", "websites")).toBeNull();
  });

  it("returns null when a category has no videos", () => {
    // "Free Icons" is registered with websites only.
    expect(getData("Free Icons", "videos")).toBeNull();
  });

  it('returns "%" shape even when videos are missing', () => {
    const data = getData("Free Icons", "%");
    expect(Array.isArray(data.websites)).toBe(true);
    expect(data.videos).toBeUndefined();
  });

  it("does not mutate or annotate items with an icon field", () => {
    // Regression: previous combineData() prepended broken /public/ paths.
    const data = getData("HTML", "websites");
    for (const item of data) {
      expect(item).not.toHaveProperty("icon");
    }
  });
});

describe("searchForData(searchText)", () => {
  it("matches website titles", () => {
    const results = searchForData("MDN");
    expect(results.websites.length).toBeGreaterThan(0);
    expect(
      results.websites.every((w) =>
        (w.title + w.description).toLowerCase().includes("mdn")
      )
    ).toBe(true);
  });

  it("matches video titles", () => {
    const results = searchForData("React");
    expect(results.videos.length).toBeGreaterThan(0);
  });

  it("is case-insensitive", () => {
    const lower = searchForData("react");
    const mixed = searchForData("ReAcT");
    expect(lower.websites.length).toBe(mixed.websites.length);
    expect(lower.videos.length).toBe(mixed.videos.length);
  });

  it("returns empty buckets when nothing matches", () => {
    const results = searchForData("zzzzzz-no-match-zzzzzz");
    expect(results.websites).toEqual([]);
    expect(results.videos).toEqual([]);
  });

  it("searches website descriptions too", () => {
    // Pick a word likely to appear in a description but rarely in a title.
    const results = searchForData("comprehensive");
    expect(results.websites.length).toBeGreaterThan(0);
  });
});
