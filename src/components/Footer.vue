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
            <DotLottieVue class="lottie" autoplay loop src="/lottie/buy-me-a-coffee.json" />
        </a>

        <!-- Buy me a coffee link -->
        <div class="flex justify-center">
            <a class="text-cyan-400 hover:text-cyan-600 text-xs flex align-middle justify-center" href="/support-me">
                {{ dict.support_me_by }}
            </a>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
.lottie {
    margin: 0 auto;
    width: 200px;
}
</style>