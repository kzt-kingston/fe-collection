<script setup>
import { ref } from 'vue';

defineProps({
    video: Object
});

const openVideo = ref(false);
</script>

<template>
    <div class="border p-4 rounded-lg shadow-md flex flex-col">
        <div class="relative cursor-pointer" @click="openVideo = true">
            <img :src="`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`" :alt="video.title"
                class="rounded-lg w-full mb-2">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-black bg-opacity-50 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Video Modal -->
        <div v-if="openVideo" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div class="relative w-full max-w-4xl mx-4">
                <button @click="openVideo = false" class="absolute -top-10 right-0 text-white hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="relative pt-[56.25%]">
                    <iframe 
                        :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
                        class="absolute top-0 left-0 w-full h-full"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
        <h3 class="text-lg font-semibold">{{ video.title }}</h3>
        <a :href="`https://www.youtube.com/watch?v=${video.id}`" target="_blank"
            class="text-blue-500 hover:underline flex items-center">
            Watch on YouTube <span class="ml-1">▶️</span>
        </a>
    </div>
</template>
