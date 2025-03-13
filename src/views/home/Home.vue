<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue';
import { getDictionary } from '@/locale/dict';
import { Heart, Download } from 'lucide-vue-next';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { useAuthStore } from '@/stores/authStore';
import ResourceCarousel from '@/components/ResourceCarousel.vue';
import SplineViewer from '@/components/SplineViewer.vue';

const authStore = useAuthStore();
const dict = ref({});
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
        const { outcome } = await (deferredPrompt.value).userChoice;
        if (outcome === 'accepted') {
            console.log('PWA installed');
        }
        deferredPrompt.value = null;
        showInstallButton.value = false;
    }
};

onMounted(() => {
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);

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
                <span class="text-6xl font-bold"><span class="text-cyan-500 animate-pulse">Frontend</span>
                    Collection!</span>
                <br />
                <br />
                <div class="mb-5">{{ dict.a_place_where }}
                </div>
                <a href="https://roadmap.sh/frontend" target="_blank" rel="noopener noreferrer"
                    class="text-cyan-500 text-md font-bold rounded-md p-3 hover:text-cyan-600 cursor-pointer">View
                    Roadmap 🚀</a>
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
                Install App
                <Download size="12" class="text-cyan-500 hover:text-cyan-600" />
            </button>
        </div>

        <router-link :to="authStore.session ? '/onboarding' : '/register'">
            <div class="flex items-center justify-center my-10">

                <button class="bg-cyan-500 text-white font-bold rounded-md p-3 hover:bg-cyan-600 cursor-pointer w-4/5">
                    <div>
                        {{ dict.start_expore }}
                    </div>
                </button>
            </div>
        </router-link>
    </section>
    <section id="resource-carousel" class="mt-10">
        <!-- Resource Carousel -->
        <ResourceCarousel :logos="logos" />
    </section>
    <section id="support-me">
        <!-- Support Me -->
        <DotLottieVue style="width:200px;" class="mx-auto" autoplay loop src="/lottie/buy-me-a-coffee.json" />
        <div class="flex items-center justify-center my-2">
            <router-link to="/support-me"
                class="flex items-center gap-2 text-xs text-cyan-500 hover:text-cyan-600 p-2 border-solid border border-cyan-500 rounded-md">
                {{ dict.support_me_by }}
                <Heart size="15" class="text-red-500 hover:text-red-600" />
            </router-link>
        </div>
        <!-- Developed By -->
        <div class="text-center text-xs text-gray-500 mt-5">
            <a href="https://kyawkingston.com" target="_blank" rel="noopener noreferrer">
                Developed by Kyaw Zin Thet
            </a>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.lottie {
    margin: 0 auto;
    width: 100px;
}
</style>
