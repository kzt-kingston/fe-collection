<script setup>
import Footer from '@/components/Footer.vue'
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
        <div class="max-w-4xl mx-auto p-5 min-h-screen">
            <MusicPlayer :show-music-player="showMusicPlayer" />
            <slot />
        </div>
        <div class="w-full mx-auto">
            <Footer />
        </div>
    </div>
</template>