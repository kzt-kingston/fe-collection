<script setup>
import { useLocale } from '@/locale/useLocale';

defineProps({
  hasActiveQuiz: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-quiz', 'continue-quiz']);
const { dict } = useLocale();

const quizTypes = [
  {
    id: 'html',
    name: 'HTML',
    descriptionKey: 'quiz_desc_html',
    icon: '/resources/html.png'
  },
  {
    id: 'css',
    name: 'CSS',
    descriptionKey: 'quiz_desc_css',
    icon: '/resources/css.png'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    descriptionKey: 'quiz_desc_javascript',
    icon: '/resources/javascript.png'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    descriptionKey: 'quiz_desc_typescript',
    icon: '/resources/typescript.png'
  },
  {
    id: 'react',
    name: 'React',
    descriptionKey: 'quiz_desc_react',
    icon: '/resources/react.png'
  },
  {
    id: 'vue',
    name: 'Vue',
    descriptionKey: 'quiz_desc_vue',
    icon: '/resources/vue.png'
  },
  {
    id: 'angular',
    name: 'Angular',
    descriptionKey: 'quiz_desc_angular',
    icon: '/resources/angular.png'
  }
];

const selectQuiz = (quizId) => {
  emit('select-quiz', quizId);
};

const continueQuiz = () => {
  emit('continue-quiz');
};
</script>

<template>
  <div class="quiz-selection">
    <div v-if="hasActiveQuiz" class="continue-quiz mb-8 p-6 border-2 border-cyan-300 rounded-lg text-center">
      <p class="text-lg mb-3">{{ dict.unfinished_quiz }}</p>
      <button 
        @click="continueQuiz" 
        class="bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
      >
        {{ dict.continue_quiz }}
      </button>
    </div>
    
    <h2 class="text-2xl font-semibold mb-6">{{ dict.select_a_quiz }}</h2>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="quiz in quizTypes" 
        :key="quiz.id" 
        class="quiz-card p-6 border border-gray-200 rounded-lg hover:border-cyan-300 cursor-pointer transition-all hover:shadow-md"
        @click="selectQuiz(quiz.id)"
      >
        <img :src="quiz.icon" alt="Quiz Icon" class="w-16 h-16 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-cyan-500 mb-2">{{ quiz.name }}</h3>
        <p class="text-gray-600 mb-4">{{ dict[quiz.descriptionKey] }}</p>
        <button 
          class="bg-cyan-500 text-white font-medium px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors w-full"
        >
          {{ dict.start_quiz }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.quiz-card button {
  margin-top: auto;
}
</style>
