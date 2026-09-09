<script setup>
import { computed } from 'vue';
import { ExternalLink } from 'lucide-vue-next';
import { useLocale } from '@/locale/useLocale';

const props = defineProps({
    website: Object
});

const { dict } = useLocale();

const faviconUrl = computed(() => {
    try {
        const { hostname } = new URL(props.website.url);
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    } catch {
        return '';
    }
});
</script>

<template>
    <div class="border p-4 pr-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
        <div class="flex items-start gap-2 mb-1">
            <img v-if="faviconUrl" :src="faviconUrl" alt="" width="16" height="16" class="mt-1.5 shrink-0" />
            <h3 class="text-lg font-semibold">{{ website.title }}</h3>
        </div>
        <p class="text-sm text-gray-600 mb-2 flex-1">{{ website.description }}</p>
        <a :href="website.url" target="_blank" rel="noopener noreferrer"
            class="text-cyan-500 hover:text-cyan-600 hover:underline flex items-center gap-1 mt-auto">
            {{ dict.visit_website }}
            <ExternalLink :size="14" />
        </a>
    </div>
</template>
