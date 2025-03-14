<script setup>
import { computed } from 'vue';
import { useQuizStore } from '@/stores/quizStore';

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  quizType: {
    type: String,
    required: true
  }
});

const quizStore = useQuizStore();
const emit = defineEmits(['restart']);

console.log("Wrong Answers:", quizStore.getWrongAnswersQuestions());
console.log("Wrong Selected Answers:", quizStore.getWrongSelectedAnswers());

let wrongSelectedAnswers = quizStore.getWrongSelectedAnswers();

const percentage = computed(() => {
  return Math.round((props.score / props.total) * 100);
});

const performance = computed(() => {
  if (percentage.value >= 90) return { message: 'Excellent!', emoji: '🏆' };
  if (percentage.value >= 70) return { message: 'Great job!', emoji: '🎉' };
  if (percentage.value >= 50) return { message: 'Good effort!', emoji: '👍' };
  return { message: 'Keep practicing!', emoji: '💪' };
});

const quizTypeName = computed(() => {
  switch (props.quizType) {
    case 'html': return 'HTML';
    case 'css': return 'CSS';
    case 'javascript': return 'JavaScript';
    default: return props.quizType;
  }
});

const restart = () => {
  emit('restart');
};

const wrongAnswers = computed(() => {
  return quizStore.getWrongAnswersQuestions();
});
</script>

<template>
  <div class="results-container text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-5">Quiz Result</h1>
    <div class="emoji text-7xl mb-6">{{ performance.emoji }}</div>
    <h2 class="text-3xl font-bold text-cyan-500 mb-3">{{ performance.message }}</h2>
    <p class="text-xl mb-6">
      You scored <span class="font-bold">{{ score }} out of {{ total }}</span> in the {{ quizTypeName }} quiz.
    </p>
    
    <div class="score-display mb-8">
      <div class="relative h-48 w-48 mx-auto">
        <svg class="w-full h-full" viewBox="0 0 100 100">
          <circle 
            class="text-gray-200 stroke-current" 
            stroke-width="10" 
            cx="50" 
            cy="50" 
            r="40" 
            fill="transparent"
          />
          <circle 
            class="text-cyan-500 stroke-current" 
            stroke-width="10" 
            stroke-linecap="round" 
            cx="50" 
            cy="50" 
            r="40" 
            fill="transparent"
            :stroke-dasharray="`${percentage * 2.51} 251`"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-4xl font-bold text-cyan-500">{{ percentage }}%</span>
        </div>
      </div>
    </div>

    <!-- Show the results of Wrong Answers -->
    <hr/>
    <div v-if="wrongAnswers.length" class="wrong-answers-section mt-8 mb-8 text-left">
      <h3 class="text-2xl font-bold text-gray-700 mb-4">Review Incorrect Answers</h3>
      
      <div v-for="(item, index) in wrongAnswers" :key="index" class="wrong-answer-item mb-6 bg-gray-50 p-4 rounded-lg">
        <div class="question mb-2 font-medium">
          <span class="text-gray-700">Q: {{ item.question }}</span>
        </div>
        
        <div class="selected-answer mb-2 pl-4 border-l-4 border-red-400">
          <span class="text-sm text-gray-500">Your answer:</span>
          <span class="text-red-500 ml-2">{{ wrongSelectedAnswers[index] }}</span>
        </div>
        
        <div class="correct-answer pl-4 border-l-4 border-green-400">
          <span class="text-sm text-gray-500">Correct answer:</span>
          <span class="text-green-500 ml-2">{{ item.answer }}</span>
        </div>
      </div>
    </div>
    
    <button 
      @click="restart" 
      class="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
    >
      Try Another Quiz
    </button>
  </div>
</template>

<style scoped>
.score-display svg circle {
  transition: stroke-dasharray 1s ease-in-out;
}

.wrong-answers-section {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.wrong-answer-item {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.wrong-answer-item:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}
</style>
