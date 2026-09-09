import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useQuizStore } from "@/stores/quizStore";
import htmlQuestions from "@/data/quiz-questions/html.json";
import cssQuestions from "@/data/quiz-questions/css.json";
import javascriptQuestions from "@/data/quiz-questions/javascript.json";
import typescriptQuestions from "@/data/quiz-questions/typescript.json";
import reactQuestions from "@/data/quiz-questions/react.json";
import vueQuestions from "@/data/quiz-questions/vue.json";
import angularQuestions from "@/data/quiz-questions/angular.json";

const BANKS = [
  ["html", htmlQuestions],
  ["css", cssQuestions],
  ["javascript", javascriptQuestions],
  ["typescript", typescriptQuestions],
  ["react", reactQuestions],
  ["vue", vueQuestions],
  ["angular", angularQuestions],
];

describe("quiz question banks", () => {
  it.each(BANKS)("%s questions have a valid schema", (_type, questions) => {
    expect(questions.length).toBeGreaterThanOrEqual(90);

    const ids = questions.map((q) => q.id);
    expect(ids.every((id) => Number.isInteger(id) && id > 0)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);

    for (const q of questions) {
      expect(typeof q.question).toBe("string");
      expect(q.question.length).toBeGreaterThan(0);
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
      expect(
        q.options.every((opt) => typeof opt === "string" && opt.length > 0),
      ).toBe(true);
      expect(q.options.includes(q.answer)).toBe(true);
    }
  });
});

describe("quiz scoring against each bank", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it.each(BANKS.map(([type]) => type))(
    "scores every %s question correctly when the matching option is selected",
    (type) => {
      const store = useQuizStore();
      store.initializeQuiz(type);

      expect(store.questions.length).toBeGreaterThan(0);
      expect(store.questions.length).toBeLessThanOrEqual(30);

      for (let i = 0; i < store.questions.length; i++) {
        const correctIdx = store.questions[i].options.indexOf(
          store.questions[i].answer,
        );
        expect(correctIdx).toBeGreaterThanOrEqual(0);
        store.currentQuestionIndex = i;
        store.selectAnswer(correctIdx);
      }

      expect(store.score).toBe(store.questions.length);
    },
  );
});
