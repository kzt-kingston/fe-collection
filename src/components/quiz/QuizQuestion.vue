<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  selectedAnswer: {
    type: Number,
    default: null
  },
  canGoPrevious: {
    type: Boolean,
    default: false
  },
  canGoNext: {
    type: Boolean,
    default: false
  },
  isLastQuestion: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-answer', 'next-question', 'previous-question']);

const selectAnswer = (index) => {
  emit('select-answer', index);
};

const nextQuestion = () => {
  emit('next-question');
};

const previousQuestion = () => {
  emit('previous-question');
};
</script>

<template>
  <div class="question-container p-6 border border-gray-200 rounded-lg">
    <div class="question mb-6">
      <h3 class="text-xl font-semibold mb-2">{{ question.question }}</h3>
    </div>
    
    <div class="options space-y-3">
      <div 
        v-for="(option, index) in question.options" 
        :key="index"
        class="option p-4 border rounded-md cursor-pointer transition-all"
        :class="{
          'border-gray-200 hover:border-cyan-300': selectedAnswer !== index,
          'border-cyan-500 bg-cyan-50': selectedAnswer === index
        }"
        @click="selectAnswer(index)"
      >
        <div class="flex items-center">
          <div class="option-indicator w-6 h-6 rounded-full flex items-center justify-center mr-3"
               :class="selectedAnswer === index ? 'bg-cyan-500 text-white' : 'border border-gray-300'">
            <span>{{ String.fromCharCode(65 + index) }}</span>
          </div>
          <div>{{ option }}</div>
        </div>
      </div>
    </div>
    
    <div class="navigation flex justify-between mt-8">
      <button 
        @click="previousQuestion" 
        class="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        :disabled="!canGoPrevious"
        :class="{ 'opacity-50 cursor-not-allowed': !canGoPrevious }"
      >
        Previous
      </button>
      
      <button 
        @click="nextQuestion" 
        class="px-5 py-2 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 transition-colors"
        :disabled="selectedAnswer === null"
        :class="{ 'opacity-50 cursor-not-allowed': selectedAnswer === null }"
      >
        {{ isLastQuestion ? 'Finish Quiz' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.option:hover {
  transform: translateY(-2px);
}
</style>
