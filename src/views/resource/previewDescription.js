export const PREVIEW_SENTENCE_COUNT = 3;

export const getDescriptionSentences = (resource, lang = "en") => {
  const desc = resource?.description;
  if (!desc || typeof desc !== "object" || Array.isArray(desc)) return [];
  const list = desc[lang] || desc.en || [];
  return Array.isArray(list) ? list.filter((sentence) => typeof sentence === "string" && sentence.trim()) : [];
};

export const visibleSentences = (sentences, expanded, count = PREVIEW_SENTENCE_COUNT) => {
  if (!Array.isArray(sentences) || sentences.length === 0) return [];
  if (expanded || sentences.length <= count) return sentences;
  return sentences.slice(0, count);
};

export const hasMoreSentences = (sentences, count = PREVIEW_SENTENCE_COUNT) =>
  Array.isArray(sentences) && sentences.length > count;
