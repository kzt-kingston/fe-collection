import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Import quiz data
import htmlQuestions from '@/data/quiz-questions/html.json';
import cssQuestions from '@/data/quiz-questions/css.json';
import javascriptQuestions from '@/data/quiz-questions/javascript.json';

export const useQuizStore = defineStore('quiz', () => {
  console.log('Initializing quiz store'); // Debug log
  
  // State
  const quizType = ref(null);
  const questions = ref([]);
  const answers = ref([]);
  const currentQuestionIndex = ref(0);
  const isCompleted = ref(false);
  const storageKey = 'fe-collection-quiz-state';
  const totalQuestionsAmount = 30;
  
  // Get all questions based on quiz type
  const getQuestionsByType = (type) => {
    try {
      switch (type) {
        case 'html':
          return htmlQuestions;
        case 'css':
          return cssQuestions;
        case 'javascript':
          return javascriptQuestions;
        default:
          console.warn(`Unknown quiz type: ${type}`);
          return [];
      }
    } catch (error) {
      console.error('Error getting questions by type:', error);
      return [];
    }
  };
  
  // Randomly select n questions from the questions array
  const getRandomQuestions = (allQuestions, n = totalQuestionsAmount) => {
    try {
      if (!allQuestions || !allQuestions.length) {
        console.warn("No questions found to randomize");
        return [];
      }

      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(n, shuffled.length));
    } catch (error) {
      console.error("Error randomizing questions:", error);
      return allQuestions.slice(0, Math.min(n, allQuestions.length)); // Fallback to non-random if shuffle fails
    }
  };
  
  // Initialize the quiz with a specific type
  const initializeQuiz = (type) => {
    quizType.value = type;
    const allQuestions = getQuestionsByType(type);
    questions.value = getRandomQuestions(allQuestions, totalQuestionsAmount);
    answers.value = Array(questions.value.length).fill(null);
    currentQuestionIndex.value = 0;
    isCompleted.value = false;
    saveToStorage();
  };
  
  // Select an answer for the current question
  const selectAnswer = (answerIndex) => {
    answers.value[currentQuestionIndex.value] = answerIndex;
    saveToStorage();
  };
  
  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
      saveToStorage();
    } else {
      // If it's the last question and answered, mark as completed
      if (answers.value[currentQuestionIndex.value] !== null) {
        isCompleted.value = true;
        saveToStorage();
      }
    }
  };
  
  // Move to the previous question
  const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
      saveToStorage();
    }
  };
  
  // Reset the quiz
  const resetQuiz = () => {
    quizType.value = null;
    questions.value = [];
    answers.value = [];
    currentQuestionIndex.value = 0;
    isCompleted.value = false;
    localStorage.removeItem(storageKey);
  };
  
  // Save current state to localStorage
  const saveToStorage = () => {
    const state = {
      quizType: quizType.value,
      questions: questions.value,
      answers: answers.value,
      currentQuestionIndex: currentQuestionIndex.value,
      isCompleted: isCompleted.value,
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  };
  
  // Load state from localStorage
  const loadFromStorage = () => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      const state = JSON.parse(savedState);
      quizType.value = state.quizType;
      questions.value = state.questions;
      answers.value = state.answers;
      currentQuestionIndex.value = state.currentQuestionIndex;
      isCompleted.value = state.isCompleted;
      return true;
    }
    return false;
  };
  
  // Computed properties
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || null);
  const currentAnswer = computed(() => answers.value[currentQuestionIndex.value]);
  const totalQuestions = computed(() => questions.value.length);
  const hasActiveQuiz = computed(() => quizType.value && questions.value.length > 0 && !isCompleted.value);
  
  // Calculate score
  const score = computed(() => {
    return answers.value.reduce((acc, answer, index) => {
      if (answer !== null && questions.value[index].options[answer] === questions.value[index].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  });
  
  return {
    // State
    quizType,
    questions,
    answers,
    currentQuestionIndex,
    isCompleted,
    
    // Computed
    currentQuestion,
    currentAnswer,
    totalQuestions,
    score,
    hasActiveQuiz,
    
    // Actions
    initializeQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    saveToStorage,
    loadFromStorage,
  };
});
