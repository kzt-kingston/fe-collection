<script setup>
defineProps({
    video: Object
});
</script>

<template>
    <div class="border p-4 rounded-lg shadow-md flex flex-col">
        <img :src="`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`" :alt="video.title"
            class="rounded-lg w-full mb-2">
        <h3 class="text-lg font-semibold">{{ video.title }}</h3>
        <a :href="`https://www.youtube.com/watch?v=${video.id}`" target="_blank"
            class="text-blue-500 hover:underline flex items-center">
            Watch on YouTube <span class="ml-1">▶️</span>
        </a>
    </div>
</template>
