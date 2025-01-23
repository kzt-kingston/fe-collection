<script setup>
import { ref } from 'vue';
import { Search } from 'lucide-vue-next';

const searchText = ref('');

const emit = defineEmits(['search']);

const emitSearch = (event) => {
    event.preventDefault();
    if (searchText.value.trim()) {
        emit('search', searchText.value);
    }
};
</script>

<template>
    <div class="-mt-10">
        <div class="text-start mb-4">
            <h1 class="text-4xl font-bold mb-6 text-cyan-500">Image Search</h1>
            <p class="text-xs text-gray-500">Search for stunning, free downloadable images from Unsplash. Just type in a
                keyword and let the magic happen!</p>
        </div>
        <form @submit="emitSearch" class="relative mb-2">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input v-model="searchText" type="search" name="text" id="default-search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Search for images..." required />
            <button type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-sm px-4 py-2 ">
                Search
            </button>
        </form>
    </div>
</template>
