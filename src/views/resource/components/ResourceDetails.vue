<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- <div class="shadow-md rounded-lg my-10"> -->
    <div class="py-6">
        <!-- <h2 class="text-2xl font-bold mb-6">{{ title }}</h2> -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="detail in details" :key="detail.id" class="mb-4">
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-2">{{ detail.title }}</h3>
                    <p class="text-gray-700 mb-10">{{ detail.description }}</p>
                    <a :href="detail.url" class="text-cyan-900 text-xs bg-cyan-200 hover:bg-cyan-300 px-5 py-2 rounded-full"
                        target="_blank">{{dict.visit_website}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import getData from '@/util/getData';
import { onMounted, ref } from 'vue';
import { getDictionary } from '@/locale/dict';

const dict = ref({});
const details = ref([]);

const props = defineProps({
    title: String
});

onMounted(() => {
    fetchData();
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);
});

const fetchData = async () => {
    try {
        details.value = await getData(props.title,'websites');
        console.log('Fetched data', JSON.stringify(this.details))
    }
    catch {
        console.error('Error fetching data')
    }
}

</script>