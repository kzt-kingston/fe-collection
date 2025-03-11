<template>
    <div class="columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-5">
        <div v-for="{ id, url, ar, blur } in images" :key="id"
            class="after:content group cursor-pointer relative mb-4 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            @click="setCurrentImage({ id, url, ar, blur })">
            <img alt=""
                class="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                :style="{ transform: 'translate3d(0, 0, 0)' }"
                :src="`https://images.unsplash.com/${url}?auto=format&fit=crop&w=480&q=80`" :width="480"
                :height="480 / ar" :placeholder="'blur'" :blur-data-url="blurHashToDataURL(blur)" />
        </div>
    </div>
</template>

<script setup>
import { blurHashToDataURL } from './util/utils';

const props = defineProps({
    images: Array,
    setCurrentImage: Function
});
</script>
