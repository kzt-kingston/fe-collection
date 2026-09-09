<script setup>
// import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue';
import MusicPlayer from '@/views/music-player/MusicPlayer.vue';
import { ref } from 'vue'

const showMusicPlayer = ref(false)

const toggleMusicPlayer = () => {
    showMusicPlayer.value = !showMusicPlayer.value
}
</script>
<template>
    <div>
        <Navbar :active-music-player="showMusicPlayer" @toggleMusicPlayer="toggleMusicPlayer" />
        <div class="max-w-7xl mx-auto min-h-screen pt-14 px-4 pb-5">
            <MusicPlayer :show-music-player="showMusicPlayer" @close-player="showMusicPlayer = false" />
            <slot />
        </div>
        <!-- <div class="w-full mx-auto">
            <Footer />
        </div> -->
    </div>
</template>
<style></style>