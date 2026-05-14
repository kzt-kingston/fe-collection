<script setup>
defineProps({
  hasActiveQuiz: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-quiz', 'continue-quiz']);

const quizTypes = [
  {
    id: 'html',
    name: 'HTML',
    description: 'Test your knowledge of HTML tags, attributes, and semantic structure.',
    icon: '/resources/html.png'
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Challenge yourself with questions about CSS properties, selectors, and layout techniques.',
    icon: '/resources/css.png'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Assess your JavaScript skills with questions on syntax, functions, and core concepts.',
    icon: '/resources/javascript.png'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Test your TypeScript knowledge with questions on types, interfaces, and advanced features.',
    icon: '/resources/typescript.png'
  },
  {
    id: 'react',
    name: 'React',
    description: 'Evaluate your understanding of React components, hooks, and state management.',
    icon: '/resources/react.png'
  },
  {
    id: 'vue',
    name: 'Vue',
    description: 'Check your knowledge of Vue components, directives, and reactivity system.',
    icon: '/resources/vue.png'
  },
  {
    id: 'angular',
    name: 'Angular',
    description: 'Challenge yourself with questions on Angular components, services, and routing.',
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
      <p class="text-lg mb-3">You have an unfinished quiz. Would you like to continue?</p>
      <button 
        @click="continueQuiz" 
        class="bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
      >
        Continue Quiz
      </button>
    </div>
    
    <h2 class="text-2xl font-semibold mb-6">Select a Quiz</h2>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="quiz in quizTypes" 
        :key="quiz.id" 
        class="quiz-card p-6 border border-gray-200 rounded-lg hover:border-cyan-300 cursor-pointer transition-all hover:shadow-md"
        @click="selectQuiz(quiz.id)"
      >
        <img :src="quiz.icon" alt="Quiz Icon" class="w-16 h-16 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-cyan-500 mb-2">{{ quiz.name }}</h3>
        <p class="text-gray-600 mb-4">{{ quiz.description }}</p>
        <button 
          class="bg-cyan-500 text-white font-medium px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors w-full"
        >
          Start Quiz
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
