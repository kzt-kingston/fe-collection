<template>
  <div 
    class="spline-container"
    :style="{ 
      width: width, 
      height: height 
    }"
  >
    <div v-if="loading" class="spline-loader">
      {{ loadingText }}
    </div>
    <!-- Adding a specific canvas for Spline to use -->
    <canvas ref="canvas" class="spline-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { Application } from '@splinetool/runtime';

const props = defineProps({
  // URL to the Spline scene
  url: {
    type: String,
    required: true
  },
  // Width of the container
  width: {
    type: String,
    default: '100%'
  },
  // Height of the container
  height: {
    type: String,
    default: '500px'
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  }
});

const canvas = ref(null);
const loading = ref(true);
let app = null;

onMounted(async () => {
  // Wait for the DOM to be fully updated
  await nextTick();
  
  if (!canvas.value) return;
  
  try {
    // Create and initialize Spline application with the canvas element
    app = new Application(canvas.value);
    
    // Load the Spline scene
    await app.load(props.url);
    
    // Setup resize handler
    const handleResize = () => {
      if (app) {
        app.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    loading.value = false;
  } catch (error) {
    console.error('Error loading Spline scene:', error);
    loading.value = false;
  }
});

// Clean up resources when component is unmounted
onUnmounted(() => {
  if (app) {
    window.removeEventListener('resize', () => app.resize());
    app.dispose();
    app = null;
  }
});
</script>

<style scoped>
.spline-container {
  position: relative;
  display: block;
  overflow: hidden;
}

.spline-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.spline-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  z-index: 1;
}
</style>
