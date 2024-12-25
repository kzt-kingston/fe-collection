<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { onMounted, ref } from 'vue';
import { getDictionary } from '@/locale/dict';

const dict = ref({});

onMounted(() => {
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);
});
</script>
<template>
    <footer class="bg-gray-800 text-white text-center p-5">
        <div class="flex justify-center">
            <div class="flex flex-col items-center">
                <div class="text-lg font-bold">Frontend Collection</div>
            </div>
        </div>
        <a href="/support-me">
            <DotLottieVue style="width:200px;" class="mx-auto" autoplay loop src="/lottie/buy-me-a-coffee.json" />

            <!-- Buy me a coffee link -->
            <span class="text-cyan-400 hover:text-cyan-600 text-xs inline align-middle">
                {{ dict.support_me_by }}
            </span>
        </a>
    </footer>
</template>
<style lang="scss" scoped>
</style>