<script setup>
defineProps({
    playground: Object
});
</script>

<template>
    <div class="border p-4 rounded-lg shadow-md flex flex-col">
        <h3 class="text-lg font-semibold">{{ playground.title }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ playground.description }}</p>
        <a :href="playground.url" target="_blank" class="text-blue-500 hover:underline flex items-center">
            Open Playground <span class="ml-1">🛠️</span>
        </a>
    </div>
</template>
