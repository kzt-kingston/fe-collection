import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getDictionary, interpolate } from "@/locale/dict";
import { useLocale, setLang } from "@/locale/useLocale";

describe("getDictionary", () => {
  it("returns English strings for en", () => {
    const dict = getDictionary("en");
    expect(dict.start_here).toBe("Start Here");
    expect(dict.visit_website).toBe("Visit Website");
    expect(dict.voice_heading).toBe("Developer Voice");
  });

  it("returns Myanmar strings for my", () => {
    const dict = getDictionary("my");
    expect(dict.start_here).toBe("စတင်ရန်");
    expect(dict.bookmarks).toBe("သိမ်းထားသည်များ");
    expect(dict.developed_by).toBe("Developed by");
  });

  it("falls back to English for an unknown language code", () => {
    const fallback = getDictionary("xx");
    const en = getDictionary("en");
    expect(fallback).toEqual(en);
  });

  it("falls back to English when language code is missing", () => {
    expect(getDictionary(undefined).start_here).toBe("Start Here");
    expect(getDictionary(null).start_here).toBe("Start Here");
  });

  it("keeps the same keys in en and my", () => {
    const enKeys = Object.keys(getDictionary("en")).sort();
    const myKeys = Object.keys(getDictionary("my")).sort();
    expect(myKeys).toEqual(enKeys);
  });
});

describe("interpolate", () => {
  it("replaces named placeholders", () => {
    expect(interpolate("Question {current} of {total}", { current: 3, total: 10 })).toBe(
      "Question 3 of 10",
    );
  });

  it("leaves unknown placeholders intact", () => {
    expect(interpolate("Hello {name}", {})).toBe("Hello {name}");
  });

  it("returns an empty string for nullish templates", () => {
    expect(interpolate(null)).toBe("");
    expect(interpolate(undefined)).toBe("");
  });
});

describe("useLocale", () => {
  const originalLang = globalThis.localStorage?.getItem("lang");

  beforeEach(() => {
    setLang("en");
  });

  afterEach(() => {
    if (originalLang == null) {
      localStorage.removeItem("lang");
      setLang("en");
    } else {
      setLang(originalLang);
    }
  });

  it("defaults to English and interpolates keys", () => {
    const { lang, t } = useLocale();
    expect(lang.value).toBe("en");
    expect(t("question_of", { current: 2, total: 5 })).toBe("Question 2 of 5");
  });

  it("updates all consumers without a page reload", () => {
    const { lang, t, dict } = useLocale();
    setLang("my");
    expect(lang.value).toBe("my");
    expect(localStorage.getItem("lang")).toBe("my");
    expect(dict.start_here).toBe("စတင်ရန်");
    expect(t("you_scored", { score: 8, total: 10, type: "HTML" })).toBe(
      "HTML quiz တွင် 8 / 10 ရရှိပါသည်။",
    );
  });
});
