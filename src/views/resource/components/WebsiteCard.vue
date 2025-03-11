<script setup>
defineProps({
    website: Object
});
</script>

<template>
    <div class="border p-4 rounded-lg shadow-md flex flex-col">
        <h3 class="text-lg font-semibold">{{ website.title }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ website.description }}</p>
        <a :href="website.url" target="_blank" class="text-blue-500 hover:underline flex items-center">
            Visit Website <span class="ml-1">🔗</span>
        </a>
    </div>
</template>
