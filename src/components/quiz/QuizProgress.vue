<script setup>
const props = defineProps({
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
</script>

<template>
  <div class="progress-container mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-500">Question {{ current }} of {{ total }}</span>
      <span class="text-sm font-medium text-cyan-500">{{ Math.round(percentage) }}% Complete</span>
    </div>
    
    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div 
        class="h-full bg-cyan-500 transition-all duration-300 ease-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>
