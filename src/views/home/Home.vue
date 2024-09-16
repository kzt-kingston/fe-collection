<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>
<template>
    <section id="hero">
        <div class="grid mt-28 md:grid-cols-2 gap-4 items-center">
            <div class="col-span-1 text-lg leading-normal text-center">
                <!-- <div class="text-xl">Welcome to</div> -->
                <span class="text-6xl font-bold"><span class="text-cyan-500 animate-pulse">Frontend</span>
                    Collection!</span>
                <br />
                <br />
                <div class="mb-5">A place where you can explore all the resources, cheat sheets, tips and tricks in one
                    place!
                </div>
            </div>
            <div class="col-span-1 flex justify-center">
                <img class="w-80 flex mx-auto" src="/logo.jpeg" alt="logo" />
            </div>
        </div>
        <router-link to="/resource">
            <div class="flex items-center justify-center my-10">

                <button class="bg-cyan-500 text-white font-bold rounded-md p-3 hover:bg-cyan-600 cursor-pointer w-4/5">
                    <div>
                        Start Explore
                    </div>
                </button>
            </div>
        </router-link>
    </section>
</template>
<style lang="scss" scoped>
.lottie {
    margin: 0 auto;
    width: 100px;
}
</style>
