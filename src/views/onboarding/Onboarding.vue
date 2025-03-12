<script setup>
import SplineViewer from '@/components/SplineViewer.vue';
import { ref, onMounted } from 'vue';
import { Puzzle, Shapes } from 'lucide-vue-next';

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
        <SplineViewer url="https://prod.spline.design/2p2V3R-GYEWxtFBR/scene.splinecode" height="300px"
            loadingText='Awaiting Initialization...' />
        <div class="flex justify-center mx-auto">
            <router-link to="/resource">
                <button class="flex bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-2">
                    <Shapes class="mr-1" size="20" />ResourceBase
                </button>
            </router-link>
            <router-link to="/quiz">
                <button class="flex bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                    <Puzzle class="mr-1" size="20" />Quiz
                </button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.onboarding-container {
    margin-top: 40px;
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