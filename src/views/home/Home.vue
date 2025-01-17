<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue';
import { getDictionary } from '@/locale/dict';
import { Heart } from 'lucide-vue-next';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const dict = ref({});

onMounted(() => {
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);
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
                <img class="w-80 flex mx-auto" src="/logo.jpeg" alt="logo" />
            </div>
        </div>
        <router-link to="/resource">
            <div class="flex items-center justify-center my-10">

                <button class="bg-cyan-500 text-white font-bold rounded-md p-3 hover:bg-cyan-600 cursor-pointer w-4/5">
                    <div>
                        {{ dict.start_expore }}
                    </div>
                </button>
            </div>
        </router-link>
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
