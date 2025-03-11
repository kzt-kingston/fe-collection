<script setup>
import SplineViewer from '@/components/SplineViewer.vue';
import { ref, onMounted } from 'vue';

const audio = new Audio('/sound-effects/robot initialize.mp3');

const initializeRobot = () => {
    audio.play();
};

onMounted(() => {
    initializeRobot();
});
</script>

<template>
    <div class="onboarding-container">
        <SplineViewer 
            url="https://prod.spline.design/2p2V3R-GYEWxtFBR/scene.splinecode" 
            height="600px" 
            loadingText='Awaiting Initialization...'
        />
    </div>
</template>

<style scoped>
.onboarding-container {
    position: relative;
}

.initialization-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
    color: white;
}

.initialize-button {
    padding: 12px 24px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
}

.initialize-button:hover {
    background-color: #45a049;
}
</style>