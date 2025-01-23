<template>
    <main class="mx-auto max-w-[1960px] p-4 relative">
        <Modal :currentImage="currentImage" :setCurrentImage="setCurrentImage" />
        <SearchBar @search="search" />
        <div v-if="ready === false"
            class="z-10 fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 flex items-center justify-center">
            <div class="text-black text-xl font-bold animate-pulse">Loading model and database...</div>
        </div>
        <ImageGrid :images="images" :setCurrentImage="setCurrentImage" />
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Modal from './Modal.vue';
import SearchBar from './SearchBar.vue';
import ImageGrid from './ImageGrid.vue';

const ready = ref(null);
const images = ref(null);
const currentImage = ref(null);
const worker = ref(null);

onMounted(() => {
    if (!worker.value) {
        worker.value = new Worker(new URL('./util/worker.js', import.meta.url), {
            type: 'module',
        });
    }

    const onMessageReceived = (e) => {
        switch (e.data.status) {
            case 'initiate':
                ready.value = false;
                break;
            case 'ready':
                ready.value = true;
                break;
            case 'complete':
                images.value = e.data.output;
                break;
        }
    };

    worker.value.addEventListener('message', onMessageReceived);

    onUnmounted(() => {
        worker.value.removeEventListener('message', onMessageReceived);
    });
});

const search = (text) => {
    console.log('Searching for:', text);
    if (worker.value) {
        worker.value.postMessage({ text });
    }
};

const setCurrentImage = (image) => {
    currentImage.value = image;
};
</script>
