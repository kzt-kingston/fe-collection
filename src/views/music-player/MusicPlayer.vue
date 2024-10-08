<template>
  <section id="music-player" class="my-20">
    <div class="text-center">
      <!-- Title Music Player -->
      <h1 class="text-2xl font-semibold text-gray-800 mb-2"><span class="text-cyan-500 animate-pulse">Frontend</span>
        Collection</h1>
      <h2 class="text-md font-semibold text-gray-800 mb-4">Music Player</h2>
    </div>
    <div class="bg-gradient-to-r from-cyan-300 to-purple-300 p-6 rounded-xl shadow-lg max-w-xs mx-auto">
      <div class="bg-white rounded-lg p-4 shadow-inner">

        <div class="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <DotLottieVue autoplay loop class="lottie" src="/lottie/piano-play.json" />
        </div>
        <h2 class="text-lg font-semibold text-gray-800 mb-1">{{ currentTrackName }}</h2>
        <!-- show track number 1/8 -->
        <p class="text-sm text-gray-500 mb-4">Track {{ currentTrackIndex + 1 }}/ {{ totalTracks }}</p>
        <div class="h-1 w-full bg-gray-200 rounded-full mb-4">
          <div class="h-1 bg-pink-500 rounded-full" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="flex justify-between items-center">
          <button @click="playPreviousTrack" class="text-gray-600 hover:text-pink-500 transition-colors">
            <SkipBack size="24" />
          </button>
          <button @click="togglePlayPause"
            class="bg-pink-500 text-white rounded-full p-3 hover:bg-pink-600 transition-colors">
            <component :is="isPlaying ? Pause : Play" size="24" />
          </button>
          <button @click="playNextTrack" class="text-gray-600 hover:text-pink-500 transition-colors">
            <SkipForward size="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Disclaimer about the music tracks used from Pixabay -->
    <div class="text-center mt-5">
      <p class="text-xs text-gray-500">{{dict.music_tracks_used}}</p>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-vue-next'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { getDictionary } from '@/locale/dict';

const tracks = import.meta.glob('@/assets/music/*.mp3');
const totalTracks = Object.values(tracks).length
const isPlaying = ref(false)
const progress = ref(0)
const currentTrack = ref(null)
const currentTrackIndex = ref(0)
const currentTrackName = ref('')
const audioRef = ref(null)
const dict = ref({});

const handleTimeUpdate = () => {
  if (audioRef.value) {
    const currentProgress = (audioRef.value.currentTime / audioRef.value.duration) * 100
    progress.value = currentProgress
  }
}

const togglePlayPause = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const skipBackward = () => {
  if (audioRef.value) {
    audioRef.value.currentTime -= 10
  }
}

const skipForward = () => {
  if (audioRef.value) {
    audioRef.value.currentTime += 10
  }
}

const playNextTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % Object.values(tracks).length
  currentTrack.value = Object.values(tracks)[currentTrackIndex.value].name;
  currentTrackName.value = getTrackName(currentTrack.value)
  audioRef.value.src = currentTrack.value
  audioRef.value.play()
  isPlaying.value = true // auto play next track
}

const playPreviousTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + Object.values(tracks).length) % Object.values(tracks).length
  currentTrack.value = Object.values(tracks)[currentTrackIndex.value].name;
  currentTrackName.value = getTrackName(currentTrack.value)
  audioRef.value.src = currentTrack.value
  audioRef.value.play()
  isPlaying.value = true // auto play previous track
}

const getTrackName = (track) => {
  return track.split('/').pop().split('.').shift()
}

const init = () => {
  currentTrack.value = Object.values(tracks)[0].name;
  currentTrackName.value = getTrackName(currentTrack.value)
  audioRef.value = new Audio(currentTrack.value)
  audioRef.value.addEventListener('timeupdate', handleTimeUpdate)
  audioRef.value.addEventListener('ended', playNextTrack)
}

const pauseAudio = () => {
  if (audioRef.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  }
};

onMounted(() => {
  const lang = localStorage.getItem('lang') || 'en';
  dict.value = getDictionary(lang);
  init();
})

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.removeEventListener('timeupdate', handleTimeUpdate)
    audioRef.value.removeEventListener('ended', playNextTrack)
    pauseAudio();
  }
})
</script>

<style scoped lang="scss">
// page load animation
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

#music-player {
  animation: fadeIn 1s;
}

h1 {
  font-family: 'Poppins', sans-serif;
}

h2 {
  font-family: 'Poppins', sans-serif;
}

button {
  cursor: pointer;
}

button:hover {
  transform: scale(1.1);
}
</style>