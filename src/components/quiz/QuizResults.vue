<script setup>
import { computed } from 'vue';

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

const emit = defineEmits(['restart']);

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
</script>

<template>
  <div class="results-container text-center">
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
</style>
