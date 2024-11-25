<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="resource-details" class="py-6">
        <div v-if="resourceType == 'websites'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="detail in details" :key="detail.id" class="mb-4">
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-2">{{ detail.title }}</h3>
                    <p class="text-gray-700 mb-10">{{ detail.description }}</p>
                    <a :href="detail.url"
                        class="text-cyan-900 text-xs bg-cyan-200 hover:bg-cyan-300 px-5 py-2 rounded-full"
                        target="_blank">{{ dict.visit_website }}</a>
                </div>
            </div>
        </div>
        <div id="video-player" v-else-if="resourceType == 'videos'">
            <div v-if="videos" class="flex flex-col md:flex-row bg-white">
                <!-- Main video player -->
                <div class="md:w-3/5 p-4">
                    <div class="aspect-w-16 aspect-h-9">
                        <iframe :src="`https://www.youtube.com/embed/${currentVideo.id}`" allowfullscreen
                            class="w-full h-full rounded-md"></iframe>
                    </div>
                    <h2 class="text-xl font-bold mt-4">{{ currentVideo.title }}</h2>
                </div>

                <!-- Video playlist -->
                <div class="md:w-2/5 bg-gray-100 p-4 overflow-y-auto">
                    <h3 class="text-lg font-semibold mb-4">Playlist</h3>
                    <ul>
                        <li v-for="video in videos" :key="video.id" @click="setCurrentVideo(video)" :class="[
                            'flex items-center p-2 mb-2 rounded cursor-pointer transition-colors',
                            video.id === currentVideo.id
                                ? 'bg-[rgb(6,182,212)] text-white'
                                : 'hover:bg-gray-200',
                        ]">
                            <img :src="`https://img.youtube.com/vi/${video.id}/default.jpg`" :alt="video.title"
                                class="w-20 h-auto mr-2" />
                            <span class="flex-grow text-xs text-left text-gray-800">{{ video.title }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <!-- show there is no video message -->
                <div class="text-center text-lg font-semibold">{{ dict.no_video }}</div>
            </div>
        </div>
        <div v-if="resourceType == 'playground'" class="grid grid-cols-1 gap-4">
            <div v-if="details">
                <div v-for="detail in details" :key="detail.id" class="mb-4">
                    <div class="bg-white shadow-md rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-2">{{ detail.title }}</h3>
                        <p class="text-gray-700 mb-10">{{ detail.description }}</p>
                        <a :href="detail.url"
                            class="text-cyan-900 text-xs bg-cyan-200 hover:bg-cyan-300 px-5 py-2 rounded-full"
                            target="_blank">{{ dict.visit_website }}</a>
                    </div>
                </div>
            </div>
            <div v-else>
                <!-- show there is no video message -->
                <div class="text-center text-lg font-semibold">{{ dict.no_playground }}</div>
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
const videos = ref([]);
const currentVideo = ref({});
const setCurrentVideo = (video) => {
    currentVideo.value = video
    // auto scroll to the top of the video player
    document.getElementById('resource-details').scrollIntoView({ behavior: 'smooth' });
}
const resourceType = ref('');
const title = ref('');

const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ''
    },
    resourceType: {
        type: String,
        required: true,
        default: ''
    }
});

onMounted(() => {
    console.log('ResourceDetails mounted');
    resourceType.value = props.resourceType;
    title.value = props.title;

    console.log('Resource type:', resourceType.value);
    console.log('Title:', title.value);
    fetchData();
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);
});

const fetchData = async () => {
    try {
        const data = await getData(title.value, resourceType.value);
        if (resourceType.value === 'websites') {
            details.value = data;
            videos.value = [];
        } else if (resourceType.value === 'videos') {
            videos.value = data;
            currentVideo.value = videos.value[0];
            details.value = [];
        } else if (resourceType.value === 'playground') {
            details.value = data;
            videos.value = [];
        }

        console.log('Data:', data);
        console.log('Details:', details.value);
        console.log('Videos:', videos.value);
    }
    catch {
        console.error('Error fetching data:', error);
    }
}

</script>