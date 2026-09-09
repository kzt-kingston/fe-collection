<script setup>
import { useLocale } from '@/locale/useLocale';

defineProps({
  percentage: {
    type: Number,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const { t } = useLocale();
</script>

<template>
  <div class="progress-container mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-500">{{ t('question_of', { current, total }) }}</span>
      <span class="text-sm font-medium text-cyan-500">{{ t('percent_complete', { percentage: Math.round(percentage) }) }}</span>
    </div>
    
    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div 
        class="h-full bg-cyan-500 transition-all duration-300 ease-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>
