<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue';
import {
    Download,
    Quote,
    Shapes,
    Puzzle,
    Heart,
    Image,
    Music,
    Languages,
    ArrowRight,
    Github,
    Star,
    Smartphone,
    Share,
    Monitor,
} from 'lucide-vue-next';
import ResourceCarousel from '@/components/ResourceCarousel.vue';
import SplineViewer from '@/components/SplineViewer.vue';
import { useLocale } from '@/locale/useLocale';

const { dict } = useLocale();
const deferredPrompt = ref(null);
const showInstallButton = ref(false);
const isStandalone = ref(false);
const githubStarCount = ref(null);
const GITHUB_REPO_URL = 'https://github.com/kzt-kingston/fe-collection';
const logos = [
    { id: 1, name: 'JavaScript', src: '/resources/javascript-large.png', alt: 'JavaScript Logo' },
    { id: 2, name: 'HTML', src: '/resources/html-large.png', alt: 'HTML Logo' },
    { id: 3, name: 'CSS', src: '/resources/css-large.png', alt: 'CSS Logo' },
    { id: 4, name: 'React', src: '/resources/react-large.png', alt: 'React Logo' },
    { id: 5, name: 'Next.js', src: '/resources/nextjs-large.png', alt: 'Next.js Logo' },
    { id: 6, name: 'Vue', src: '/resources/vue-large.png', alt: 'Vue Logo' },
    { id: 7, name: 'Nuxt', src: '/resources/nuxt-large.png', alt: 'Nuxt Logo' },
    { id: 8, name: 'Angular', src: '/resources/angular-large.png', alt: 'Angular Logo' },
    { id: 9, name: 'TypeScript', src: '/resources/typescript-large.png', alt: 'TypeScript Logo' },
    { id: 10, name: 'Tailwind', src: '/resources/tailwind-large.png', alt: 'Tailwind CSS Logo' },
    { id: 11, name: 'SASS', src: '/resources/sass-large.png', alt: 'SASS Logo' },
];

const features = [
    { icon: Shapes, titleKey: 'feat_resources_title', descKey: 'feat_resources_desc', to: '/resource' },
    { icon: Puzzle, titleKey: 'feat_quiz_title', descKey: 'feat_quiz_desc', to: '/quiz' },
    { icon: Heart, titleKey: 'feat_bookmarks_title', descKey: 'feat_bookmarks_desc', to: '/bookmark' },
    { icon: Image, titleKey: 'feat_images_title', descKey: 'feat_images_desc' },
    { icon: Music, titleKey: 'feat_music_title', descKey: 'feat_music_desc' },
    { icon: Languages, titleKey: 'feat_lang_title', descKey: 'feat_lang_desc' },
];

const fetchGithubStars = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/kzt-kingston/fe-collection');
        if (!response.ok) return;
        const data = await response.json();
        if (typeof data.stargazers_count === 'number') {
            githubStarCount.value = data.stargazers_count;
        }
    } catch {
        // Keep the star button even if the count cannot be loaded.
    }
};

const installPWA = async () => {
    if (deferredPrompt.value) {
        deferredPrompt.value.prompt();
        await deferredPrompt.value.userChoice;
        deferredPrompt.value = null;
        showInstallButton.value = false;
        return;
    }
    document.getElementById('pwa')?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
    isStandalone.value =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
    fetchGithubStars();
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt.value = event;
        showInstallButton.value = true;
    });
});
</script>
<template>
    <div class="pb-8">
        <section id="hero" class="max-w-5xl mx-auto">
            <div class="mt-8 md:mt-12 grid md:grid-cols-2 gap-8 items-center">
                <div class="text-center md:text-left">
                    <p class="text-xs font-semibold tracking-widest uppercase text-cyan-600 mb-3">
                        {{ dict.hero_kicker }}
                    </p>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        <span class="text-cyan-500">Frontend</span> Collection
                    </h1>
                    <p class="mt-5 text-base md:text-lg leading-relaxed text-gray-600">
                        {{ dict.a_place_where }}
                    </p>
                    <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <router-link to="/resource"
                            class="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-cyan-600 transition-colors">
                            {{ dict.start_expore }}
                            <ArrowRight :size="18" />
                        </router-link>
                        <a href="https://roadmap.sh/frontend" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center justify-center rounded-lg px-6 py-3 border border-cyan-200 text-cyan-700 font-semibold hover:bg-cyan-50 transition-colors">
                            {{ dict.view_roadmap }}
                        </a>
                    </div>
                    <button v-if="!isStandalone" type="button" @click="installPWA"
                        class="mt-4 inline-flex items-center gap-2 text-xs text-cyan-600 hover:text-cyan-700">
                        {{ dict.install_app }}
                        <Download size="12" />
                    </button>
                </div>
                <div class="flex justify-center">
                    <SplineViewer url="https://prod.spline.design/2p2V3R-GYEWxtFBR/scene.splinecode" height="300px"
                        loadingText="Awaiting Initialization..." />
                </div>
            </div>
        </section>

        <section id="features" class="max-w-5xl mx-auto mt-16 md:mt-24">
            <div class="text-center max-w-2xl mx-auto mb-10">
                <h2 class="text-2xl md:text-3xl font-bold mb-3">{{ dict.features_heading }}</h2>
                <p class="text-gray-600 leading-relaxed">{{ dict.features_sub }}</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <template v-for="feature in features" :key="feature.titleKey">
                    <router-link v-if="feature.to" :to="feature.to"
                        class="group rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm hover:shadow-md hover:border-cyan-200 transition-all h-full">
                        <div
                            class="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                            <component :is="feature.icon" :size="22" />
                        </div>
                        <h3 class="text-lg font-semibold mb-2">{{ dict[feature.titleKey] }}</h3>
                        <p class="text-sm text-gray-600 leading-relaxed">{{ dict[feature.descKey] }}</p>
                    </router-link>
                    <div v-else class="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm h-full">
                        <div class="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                            <component :is="feature.icon" :size="22" />
                        </div>
                        <h3 class="text-lg font-semibold mb-2">{{ dict[feature.titleKey] }}</h3>
                        <p class="text-sm text-gray-600 leading-relaxed">{{ dict[feature.descKey] }}</p>
                    </div>
                </template>
            </div>
        </section>

        <section id="pwa" class="max-w-5xl mx-auto mt-16 md:mt-24">
            <div class="text-center max-w-2xl mx-auto mb-10">
                <h2 class="text-2xl md:text-3xl font-bold mb-3">{{ dict.pwa_heading }}</h2>
                <p class="text-gray-600 leading-relaxed">{{ dict.pwa_sub }}</p>
            </div>
            <p v-if="isStandalone"
                class="mb-6 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800 text-center">
                {{ dict.pwa_already_installed }}
            </p>
            <div v-else class="mb-8 text-center">
                <button v-if="showInstallButton" type="button" @click="installPWA"
                    class="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-cyan-600 transition-colors">
                    {{ dict.install_app }}
                    <Download :size="18" />
                </button>
                <p class="mt-3 text-sm text-gray-500">{{ dict.pwa_chrome_hint }}</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div class="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm h-full">
                    <div class="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                        <Smartphone :size="22" />
                    </div>
                    <h3 class="text-lg font-semibold mb-3">{{ dict.pwa_android_title }}</h3>
                    <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600 leading-relaxed">
                        <li>{{ dict.pwa_android_step1 }}</li>
                        <li>{{ dict.pwa_android_step2 }}</li>
                        <li>{{ dict.pwa_android_step3 }}</li>
                    </ol>
                </div>
                <div class="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm h-full">
                    <div class="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                        <Share :size="22" />
                    </div>
                    <h3 class="text-lg font-semibold mb-3">{{ dict.pwa_ios_title }}</h3>
                    <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600 leading-relaxed">
                        <li>{{ dict.pwa_ios_step1 }}</li>
                        <li>{{ dict.pwa_ios_step2 }}</li>
                        <li>{{ dict.pwa_ios_step3 }}</li>
                    </ol>
                </div>
                <div class="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm h-full">
                    <div class="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                        <Monitor :size="22" />
                    </div>
                    <h3 class="text-lg font-semibold mb-3">{{ dict.pwa_desktop_title }}</h3>
                    <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600 leading-relaxed">
                        <li>{{ dict.pwa_desktop_step1 }}</li>
                        <li>{{ dict.pwa_desktop_step2 }}</li>
                        <li>{{ dict.pwa_desktop_step3 }}</li>
                    </ol>
                </div>
            </div>
        </section>

        <section id="topics" class="max-w-5xl mx-auto mt-16 md:mt-24">
            <div class="text-center max-w-2xl mx-auto mb-4">
                <h2 class="text-2xl md:text-3xl font-bold mb-3">{{ dict.topics_heading }}</h2>
                <p class="text-gray-600 leading-relaxed">{{ dict.carousel_intro }}</p>
            </div>
            <ResourceCarousel :logos="logos" />
        </section>

        <section id="developer-voice" class="max-w-5xl mx-auto mt-16 md:mt-24">
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

        <section id="github-star" class="max-w-5xl mx-auto mt-10">
            <div
                class="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5">
                <p class="text-sm text-gray-600 text-center sm:text-left leading-relaxed">
                    {{ dict.github_star_sub }}
                </p>
                <a :href="GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 shrink-0 rounded-lg border border-gray-200 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black transition-colors">
                    <Github :size="18" />
                    {{ dict.github_star }}
                    <span v-if="githubStarCount !== null"
                        class="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-0.5 text-xs font-medium">
                        <Star :size="12" fill="currentColor" />
                        {{ githubStarCount }}
                    </span>
                </a>
            </div>
        </section>

        <section id="ready" class="max-w-5xl mx-auto mt-16 md:mt-24 text-center">
            <h2 class="text-2xl md:text-3xl font-bold mb-3">{{ dict.ready_heading }}</h2>
            <p class="text-gray-600 mb-6">{{ dict.ready_sub }}</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <router-link to="/resource"
                    class="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-cyan-600 transition-colors">
                    {{ dict.start_expore }}
                    <ArrowRight :size="18" />
                </router-link>
                <router-link to="/quiz"
                    class="inline-flex items-center justify-center rounded-lg px-6 py-3 border border-cyan-200 text-cyan-700 font-semibold hover:bg-cyan-50 transition-colors">
                    {{ dict.quiz }}
                </router-link>
            </div>
        </section>

        <div class="text-center text-xs text-gray-500 mt-16">
            <a href="https://kyawzinthet.tech" target="_blank" rel="noopener noreferrer">
                {{ dict.developed_by }} Kyaw Zin Thet
            </a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.lottie {
    margin: 0 auto;
    width: 100px;
}
</style>
