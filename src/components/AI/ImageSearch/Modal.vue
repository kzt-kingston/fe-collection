<template>
    <div class="fixed inset-0 z-30 backdrop-blur-2xl w-full h-full bg-black top-0 left-0 transition" :style="{
        backgroundColor: `rgba(0, 0, 0, ${currentImage ? 0.8 : 0})`,
        opacity: currentImage ? 1 : 0,
        pointerEvents: currentImage ? 'auto' : 'none',
    }">
        <template v-if="currentImage">
            <img :src="photoImageUrl" alt=""
                class="transform rounded-lg transition will-change-auto object-contain w-full h-full" />

            <div class="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button @click="setCurrentImage(null)"
                    class="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                <a :href="photoUrl"
                    class="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    target="_blank" title="View on Unsplash" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25">
                        </path>
                    </svg>
                </a>
                <button @click="downloadImage(photoImageUrl, `${currentImage.id}.png`)"
                    class="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    title="Download">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3">
                        </path>
                    </svg>
                </button>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { downloadImage } from './util/utils';

const props = defineProps({
    currentImage: Object,
    setCurrentImage: Function,
});

const photoUrl = computed(() => props.currentImage ? `https://unsplash.com/photos/${props.currentImage.id}` : null);
const photoImageUrl = computed(() => props.currentImage ? `https://images.unsplash.com/${props.currentImage.url}?auto=format&fit=crop&w=480&q=80` : null);
</script>
