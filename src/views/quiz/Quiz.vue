<script setup>
import { ref, computed, watch, onMounted, onErrorCaptured } from 'vue';
import { useQuizStore } from '@/stores/quizStore';
import QuizSelection from '@/components/quiz/QuizSelection.vue';
import QuizQuestion from '@/components/quiz/QuizQuestion.vue';
import QuizResults from '@/components/quiz/QuizResults.vue';
import QuizProgress from '@/components/quiz/QuizProgress.vue';
import { ElDialog } from 'element-plus';
import { useLocale } from '@/locale/useLocale';

const { dict } = useLocale();
const error = ref(null);
const exitDialogOpen = ref(false);
let quizStore;

try {
  quizStore = useQuizStore();
} catch (e) {
  error.value = dict.quiz_init_error;
  console.error('Pinia store error:', e);
}

const currentView = ref('selection'); // 'selection', 'quiz', 'results'
const selectedQuizType = ref(null);

// Only set up watchers and other store interactions if store is available
if (quizStore) {
  // Watch for changes to the quiz status
  watch(() => quizStore.isCompleted, (isCompleted) => {
    if (isCompleted) {
      currentView.value = 'results';
    }
  });

  // Check for an active quiz on component mount
  onMounted(() => {
    quizStore.loadFromStorage();
    if (quizStore.hasActiveQuiz) {
      selectedQuizType.value = quizStore.quizType;
    }
  });
}

// Method to start the quiz with the selected type
const startQuiz = (quizType) => {
  if (!quizStore) return;
  selectedQuizType.value = quizType;
  quizStore.initializeQuiz(quizType);
  currentView.value = 'quiz';
};

// Method to restart the quiz
const restartQuiz = () => {
  if (!quizStore) return;
  currentView.value = 'selection';
  quizStore.resetQuiz();
};

// Method to continue a previous quiz if available
const continueQuiz = () => {
  if (!quizStore) return;
  if (quizStore.hasActiveQuiz) {
    currentView.value = 'quiz';
  }
};

const confirmExitQuiz = () => {
  exitDialogOpen.value = false;
  currentView.value = 'selection';
};

// Compute the progress percentage
const progressPercentage = computed(() => {
  if (!quizStore || !quizStore.totalQuestions) return 0;
  return (quizStore.currentQuestionIndex / quizStore.totalQuestions) * 100;
});

// Capture any errors that occur during component lifecycle
onErrorCaptured((e) => {
  console.error('Quiz component error:', e);
  error.value = dict.quiz_error;
  return false; // Prevent error from propagating
});
</script>

<template>
  <div class="quiz-container max-w-6xl mx-auto bg-white mt-5">
    <!-- Error display -->
    <div v-if="error" class="error-container p-4 bg-red-100 text-red-700 rounded-md mb-6">
      {{ error }}
    </div>

    <!-- Quiz Selection -->
    <QuizSelection v-else-if="currentView === 'selection'" @select-quiz="startQuiz" @continue-quiz="continueQuiz"
      :has-active-quiz="quizStore?.hasActiveQuiz || false" />

    <!-- Quiz Questions -->
    <div v-else-if="currentView === 'quiz' && quizStore" class="quiz-questions">
      <div class="flex items-center justify-between mb-5">
        <img v-if="selectedQuizType" :src="`/resources/${selectedQuizType}.png`" :alt="`${selectedQuizType} Icon`"
          class="w-14 h-14" />
        <button type="button" class="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
          @click="exitDialogOpen = true">
          {{ dict.exit_quiz }}
        </button>
      </div>

      <QuizProgress :percentage="progressPercentage" :current="quizStore.currentQuestionIndex + 1"
        :total="quizStore.totalQuestions" />

      <QuizQuestion :question="quizStore.currentQuestion" :selected-answer="quizStore.currentAnswer"
        @select-answer="quizStore.selectAnswer" @next-question="quizStore.nextQuestion"
        @previous-question="quizStore.previousQuestion" :can-go-previous="quizStore.currentQuestionIndex > 0"
        :can-go-next="quizStore.currentQuestionIndex < quizStore.totalQuestions - 1"
        :is-last-question="quizStore.currentQuestionIndex === quizStore.totalQuestions - 1" />
    </div>

    <!-- Quiz Results -->
    <QuizResults v-else-if="currentView === 'results' && quizStore" :score="quizStore.score"
      :total="quizStore.totalQuestions" :quiz-type="quizStore.quizType" @restart="restartQuiz" />

    <el-dialog v-model="exitDialogOpen" :title="dict.exit_quiz" width="400px" align-center append-to-body>
      <p class="text-gray-600 leading-relaxed">{{ dict.exit_quiz_confirm }}</p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button type="button"
            class="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            @click="exitDialogOpen = false">
            {{ dict.cancel }}
          </button>
          <button type="button"
            class="px-4 py-2 text-sm font-medium rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            @click="confirmExitQuiz">
            {{ dict.exit_quiz }}
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.quiz-container {
  min-height: 500px;
}
</style>