import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useQuizStore } from "@/stores/quizStore";

const STORAGE_KEY = "fe-collection-quiz-state";

const answerAllCorrect = (store) => {
  for (let i = 0; i < store.questions.length; i++) {
    const correctIdx = store.questions[i].options.indexOf(
      store.questions[i].answer
    );
    store.currentQuestionIndex = i;
    store.selectAnswer(correctIdx);
  }
};

describe("quizStore", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  describe("initializeQuiz", () => {
    it("loads questions for a known type", () => {
      const store = useQuizStore();
      store.initializeQuiz("html");

      expect(store.quizType).toBe("html");
      expect(store.questions.length).toBeGreaterThan(0);
      expect(store.questions.length).toBeLessThanOrEqual(30);
    });

    it("results in an empty quiz for an unknown type", () => {
      const store = useQuizStore();
      store.initializeQuiz("klingon");

      expect(store.questions).toEqual([]);
      expect(store.answers).toEqual([]);
    });

    it("initializes answers to nulls and index to 0", () => {
      const store = useQuizStore();
      store.initializeQuiz("css");

      expect(store.answers.every((a) => a === null)).toBe(true);
      expect(store.answers.length).toBe(store.questions.length);
      expect(store.currentQuestionIndex).toBe(0);
      expect(store.isCompleted).toBe(false);
    });

    it("re-initializing replaces the previous quiz", () => {
      const store = useQuizStore();
      store.initializeQuiz("html");
      const htmlType = store.quizType;
      store.initializeQuiz("css");

      expect(htmlType).toBe("html");
      expect(store.quizType).toBe("css");
    });
  });

  describe("navigation", () => {
    it("nextQuestion advances the index", () => {
      const store = useQuizStore();
      store.initializeQuiz("javascript");
      store.selectAnswer(0); // satisfy "answered" guard if it kicks in
      store.nextQuestion();

      expect(store.currentQuestionIndex).toBe(1);
    });

    it("previousQuestion decrements the index but not below zero", () => {
      const store = useQuizStore();
      store.initializeQuiz("javascript");

      store.previousQuestion();
      expect(store.currentQuestionIndex).toBe(0);

      store.selectAnswer(0);
      store.nextQuestion();
      store.previousQuestion();
      expect(store.currentQuestionIndex).toBe(0);
    });

    it("marks the quiz completed when answering the final question and calling next", () => {
      const store = useQuizStore();
      store.initializeQuiz("html");

      store.currentQuestionIndex = store.questions.length - 1;
      store.selectAnswer(0);
      store.nextQuestion();

      expect(store.isCompleted).toBe(true);
    });
  });

  describe("scoring", () => {
    it("scores zero when nothing is answered", () => {
      const store = useQuizStore();
      store.initializeQuiz("html");

      expect(store.score).toBe(0);
    });

    it("scores all questions when every answer is correct", () => {
      const store = useQuizStore();
      store.initializeQuiz("typescript");
      answerAllCorrect(store);

      expect(store.score).toBe(store.questions.length);
    });

    it("returns wrong answers from getWrongAnswersQuestions", () => {
      const store = useQuizStore();
      store.initializeQuiz("vue");

      // Pick a deliberately wrong option (index not matching the correct answer).
      for (let i = 0; i < store.questions.length; i++) {
        const correctIdx = store.questions[i].options.indexOf(
          store.questions[i].answer
        );
        const wrongIdx = correctIdx === 0 ? 1 : 0;
        store.currentQuestionIndex = i;
        store.selectAnswer(wrongIdx);
      }

      const wrongs = store.getWrongAnswersQuestions();
      expect(wrongs.length).toBe(store.questions.length);
      expect(store.score).toBe(0);
    });
  });

  describe("persistence", () => {
    it("saves quiz state to localStorage", () => {
      const store = useQuizStore();
      store.initializeQuiz("react");

      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).not.toBeNull();
      const parsed = JSON.parse(raw);
      expect(parsed.quizType).toBe("react");
      expect(parsed.questions.length).toBe(store.questions.length);
    });

    it("loads quiz state from localStorage", () => {
      const original = useQuizStore();
      original.initializeQuiz("react");
      original.selectAnswer(0);

      // Fresh pinia instance to simulate a reload.
      setActivePinia(createPinia());
      const restored = useQuizStore();
      const ok = restored.loadFromStorage();

      expect(ok).toBe(true);
      expect(restored.quizType).toBe("react");
      expect(restored.questions.length).toBe(original.questions.length);
      expect(restored.answers[0]).toBe(0);
    });

    it("loadFromStorage returns false when nothing is stored", () => {
      const store = useQuizStore();
      expect(store.loadFromStorage()).toBe(false);
    });

    it("resetQuiz clears state and storage", () => {
      const store = useQuizStore();
      store.initializeQuiz("angular");
      store.resetQuiz();

      expect(store.quizType).toBeNull();
      expect(store.questions).toEqual([]);
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });

  describe("hasActiveQuiz", () => {
    it("is falsy initially", () => {
      const store = useQuizStore();
      expect(store.hasActiveQuiz).toBeFalsy();
    });

    it("is truthy after initializing a quiz", () => {
      const store = useQuizStore();
      store.initializeQuiz("html");
      expect(store.hasActiveQuiz).toBeTruthy();
    });

    it("is falsy once the quiz is completed", () => {
      const store = useQuizStore();
      store.initializeQuiz("html");
      store.currentQuestionIndex = store.questions.length - 1;
      store.selectAnswer(0);
      store.nextQuestion();

      expect(store.isCompleted).toBe(true);
      expect(store.hasActiveQuiz).toBeFalsy();
    });
  });
});
