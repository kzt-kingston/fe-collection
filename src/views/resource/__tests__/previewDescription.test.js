import { describe, it, expect } from "vitest";
import resourceTitles from "../data.json";
import {
  PREVIEW_SENTENCE_COUNT,
  getDescriptionSentences,
  hasMoreSentences,
  visibleSentences,
} from "../previewDescription";

describe("resource descriptions", () => {
  it("includes English and Myanmar sentence arrays for every resource", () => {
    expect(resourceTitles.length).toBeGreaterThan(0);

    for (const resource of resourceTitles) {
      expect(resource.description).toBeTypeOf("object");
      expect(Array.isArray(resource.description.en)).toBe(true);
      expect(Array.isArray(resource.description.my)).toBe(true);

      for (const lang of ["en", "my"]) {
        const sentences = resource.description[lang];
        expect(sentences.length).toBeGreaterThan(PREVIEW_SENTENCE_COUNT);
        expect(sentences.every((sentence) => typeof sentence === "string" && sentence.trim().length > 0)).toBe(
          true,
        );
      }
    }
  });
});

describe("previewDescription", () => {
  const resource = {
    description: {
      en: ["One.", "Two.", "Three.", "Four.", "Five."],
      my: ["၁။", "၂။", "၃။", "၄။"],
    },
  };

  it("picks sentences for the active language and falls back to English", () => {
    expect(getDescriptionSentences(resource, "en")).toEqual(resource.description.en);
    expect(getDescriptionSentences(resource, "my")).toEqual(resource.description.my);
    expect(getDescriptionSentences(resource, "xx")).toEqual(resource.description.en);
    expect(getDescriptionSentences(null, "en")).toEqual([]);
  });

  it("shows only the first three sentences until expanded", () => {
    const sentences = resource.description.en;
    expect(hasMoreSentences(sentences)).toBe(true);
    expect(visibleSentences(sentences, false)).toEqual(["One.", "Two.", "Three."]);
    expect(visibleSentences(sentences, true)).toEqual(sentences);
    expect(visibleSentences(["Only one."], false)).toEqual(["Only one."]);
  });
});
