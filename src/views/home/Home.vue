<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue';
import { Download, Quote } from 'lucide-vue-next';
import ResourceCarousel from '@/components/ResourceCarousel.vue';
import SplineViewer from '@/components/SplineViewer.vue';
import { useLocale } from '@/locale/useLocale';

const { dict } = useLocale();
const deferredPrompt = ref(null);
const showInstallButton = ref(false);
const logos = [
    {
        id: 1,
        name: "JavaScript",
        src: "/resources/javascript-large.png",
        alt: "JavaScript Logo",
    },
    {
        id: 2,
        name: "HTML",
        src: "/resources/html-large.png",
        alt: "HTML Logo",
    },
    {
        id: 3,
        name: "CSS",
        src: "/resources/css-large.png",
        alt: "CSS Logo",
    },
    {
        id: 4,
        name: "React",
        src: "/resources/react-large.png",
        alt: "React Logo",
    },
    {
        id: 5,
        name: "Angular",
        src: "/resources/angular-large.png",
        alt: "Angular Logo",
    },
    {
        id: 6,
        name: "Vue",
        src: "/resources/vue-large.png",
        alt: "Vue Logo",
    },
    {
        id: 7,
        name: "SASS",
        src: "/resources/sass-large.png",
        alt: "SASS Logo",
    },
    {
        id: 8,
        name: "TypeScript",
        src: "/resources/typescript-large.png",
        alt: "TypeScript Logo",
    }
]

const installPWA = async () => {
    if (deferredPrompt.value) {
        (deferredPrompt.value).prompt();
        await (deferredPrompt.value).userChoice;
        deferredPrompt.value = null;
        showInstallButton.value = false;
    }
};

onMounted(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault(); // Prevent automatic prompt
        deferredPrompt.value = event;
        showInstallButton.value = true; // Show custom install button
    });
});
</script>
<template>
    <section id="hero" class="max-w-4xl mx-auto">
        <div class="mt-28 grid md:grid-cols-2 gap-4 items-center">
            <div class="col-span-1 text-lg leading-normal text-center">
                <!-- <div class="text-xl">Welcome to</div> -->
                <span class="text-6xl font-bold"><span class="text-cyan-500">Frontend</span>
                    Collection!</span>
                <br />
                <br />
                <div class="mb-5">{{ dict.a_place_where }}
                </div>
                <a href="https://roadmap.sh/frontend" target="_blank" rel="noopener noreferrer"
                    class="text-cyan-500 text-md font-bold rounded-md p-3 hover:text-cyan-600 cursor-pointer">{{
                        dict.view_roadmap }}</a>
            </div>
            <div class="col-span-1 flex justify-center">
                <!-- <img class="w-80 flex mx-auto" src="/logo.jpeg" alt="logo" /> -->
                <SplineViewer url="https://prod.spline.design/2p2V3R-GYEWxtFBR/scene.splinecode" height="300px"
                    loadingText='Awaiting Initialization...' />
            </div>
        </div>

        <!-- Install PWA -->
        <!-- Show for installation of PWA if not installed yet -->
        <div v-if="showInstallButton" class="flex items-center justify-center my-5">
            <button @click="installPWA"
                class="flex items-center gap-2 text-xs text-cyan-500 hover:text-cyan-600 p-2 border-solid border border-cyan-500 rounded-md">
                {{ dict.install_app }}
                <Download size="12" class="text-cyan-500 hover:text-cyan-600" />
            </button>
        </div>

        <div class="flex items-center justify-center my-10">
            <router-link to="/resource"
                class="bg-cyan-500 text-white font-bold rounded-md p-3 hover:bg-cyan-600 cursor-pointer w-4/5 text-center">
                {{ dict.start_expore }}
            </router-link>
        </div>
    </section>
    <section id="developer-voice" class="max-w-4xl mx-auto mt-6">
        <div class="rounded-xl border border-cyan-200 bg-cyan-50/50 px-6 py-8 md:px-10 text-left">
            <div class="flex items-center gap-2 text-cyan-600 mb-3">
                <Quote size="16" aria-hidden="true" />
                <p class="text-xs font-semibold tracking-widest uppercase">{{ dict.voice_heading }}</p>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-5 leading-snug">{{ dict.voice_title }}</h2>
            <div class="space-y-3 text-base leading-relaxed text-gray-700">
                <p>
                    {{ dict.voice_greeting }}<a class="text-cyan-500 hover:text-cyan-600 font-medium"
                        href="https://kyawzinthet.tech" target="_blank"
                        rel="noopener noreferrer">{{ dict.voice_name }}</a>{{ dict.voice_welcome }}
                </p>
                <p>{{ dict.voice_p1 }}</p>
                <p>{{ dict.voice_p2 }}</p>
            </div>
        </div>
    </section>
    <section id="resource-carousel" class="mt-10">
        <!-- Resource Carousel -->
        <ResourceCarousel :logos="logos" />
    </section>
    <!-- Developed By -->
    <div class="text-center text-xs text-gray-500 mt-10">
        <a href="https://kyawzinthet.tech" target="_blank" rel="noopener noreferrer">
            {{ dict.developed_by }} Kyaw Zin Thet
        </a>
    </div>
</template>
<style lang="scss" scoped>
.lottie {
    margin: 0 auto;
    width: 100px;
}
</style>
