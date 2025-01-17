<template>
  <section v-show="props.showMusicPlayer" id="music-player">
    <div class="text-center">
      <!-- Title Music Player -->
      <h1 class="text-2xl font-semibold text-gray-800 py-2"><span class="text-cyan-500 animate-pulse">Frontend</span>
        Collection</h1>
      <h2 class="text-md font-semibold text-gray-800 mb-4">Music Player</h2>
    </div>
    <div class="bg-gradient-to-r from-cyan-300 to-purple-300 p-6 rounded-xl shadow-lg max-w-xs mx-auto">
      <div class="bg-white rounded-lg p-4 shadow-inner">

        <div v-if="props.showMusicPlayer" class="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <DotLottieVue autoplay loop class="lottie" src="/lottie/music-animation.json" />
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
          <button @click="skipBackward" class="text-gray-600 hover:text-pink-500 transition-colors">
            <Rewind size="24" />
          </button>
          <button @click="togglePlayPause"
            class="bg-pink-500 text-white rounded-full p-3 hover:bg-pink-600 transition-colors">
            <component :is="isPlaying ? Pause : Play" size="24" />
          </button>
          <button @click="skipForward" class="text-gray-600 hover:text-pink-500 transition-colors">
            <FastForward size="24" />
          </button>
          <button @click="playNextTrack" class="text-gray-600 hover:text-pink-500 transition-colors">
            <SkipForward size="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Disclaimer about the music tracks used from Pixabay -->
    <div class="text-center mt-5">
      <a href="https://pixabay.com/music/" target="_blank" referrerpolicy="noreferrer">
        <p class="text-xs text-gray-500">{{ dict.music_tracks_used }}</p>
      </a>
    </div>

    <!-- Close button -->
    <button @click="closeMusicPlayer"
      class="text-gray-800 rounded-full p-2 hover:text-gray-900 transition-colors flex mx-auto my-5">
      <CircleX size="30" />
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, CircleX } from 'lucide-vue-next'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { getDictionary } from '@/locale/dict';

const props = defineProps({
  showMusicPlayer: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-player']);

const closeMusicPlayer = () => {
  emit('close-player');
};

// const tracks = import.meta.glob('@/assets/music/*.mp3');
const tracks = [
  // Beats Songs
  { name: 'Better Day', path: '/music/beats/better-day-186374.mp3' },
  { name: 'Creative Technology Showreel', path: '/music/beats/creative-technology-showreel-241274.mp3' },
  { name: 'Flow', path: '/music/beats/flow-211881.mp3' },
  { name: 'For Her Chill Upbeat Summel Travel Vlog', path: '/music/beats/for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3' },
  { name: 'Lost in Dreams Abstract Chill Downtempo', path: '/music/beats/lost-in-dreams-abstract-chill-downtempo-cinematic-future-beats-270241.mp3' },
  { name: 'Mellow Future Bass Bounce On It', path: '/music/beats/mellow-future-bass-bounce-on-it-184234.mp3' },
  { name: 'Night Detective', path: '/music/beats/night-detective-226857.mp3' },
  { name: 'Nightfall Future Bass Music', path: '/music/beats/nightfall-future-bass-music-228100.mp3' },
  { name: 'Perfect Beauty', path: '/music/beats/perfect-beauty-191271.mp3' },
  { name: 'Showreel Music Promo Advertising', path: '/music/beats/showreel-music-promo-advertising-opener-vlog-background-intro-theme-261601.mp3' },
  { name: 'Soulsweeper', path: '/music/beats/soulsweeper-252499.mp3' },
  { name: 'Spinning Head', path: '/music/beats/spinning-head-271171.mp3' },
  { name: 'Stylish Deep Electronic', path: '/music/beats/stylish-deep-electronic-262632.mp3' },
  { name: 'Tell Me the Truth', path: '/music/beats/tell-me-the-truth-260010.mp3' },
  { name: 'Vlog Music Beat Trailer Showreel', path: '/music/beats/vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290.mp3' },
  // Piano Songs
  { name: 'Calm Bird', path: '/music/piano/calm-bird-117017.mp3' },
  { name: 'Classical Piano Music Carmen', path: '/music/piano/classical-piano-music-carmen-239495.mp3' },
  { name: 'Evening Glow Soft Piano Music', path: '/music/piano/evening-glow-soft-piano-music-243818.mp3' },
  { name: 'Faded Relaxing Piano Music', path: '/music/piano/faded-relaxing-piano-music-218335.mp3' },
  { name: 'Good Night Melody Piano', path: '/music/piano/good-night-melody-piano-245836.mp3' },
  { name: 'Hold On Relaxing Piano Music', path: '/music/piano/hold-on-relaxing-piano-music-212489.mp3' },
  { name: 'Moonlit Night Relaxing Piano', path: '/music/piano/moonlit-night-relaxing-piano-225114.mp3' },
  { name: 'Morning Espresso Relaxing Piano', path: '/music/piano/morning-espresso-relaxing-piano-music-239265.mp3' },
  { name: 'Pleasantly', path: '/music/piano/pleasantly-142607.mp3' },
  { name: 'Please Calm My Mind', path: '/music/piano/please-calm-my-mind-125566.mp3' },
  { name: 'Relaxing', path: '/music/piano/relaxing-145038.mp3' },
  { name: 'Relaxing Music Harmony of Love', path: '/music/piano/relaxing-music-harmony-of-love-247525.mp3' },
  { name: 'Relaxing Piano', path: '/music/piano/relaxing-piano-239514.mp3' },
  { name: 'Relaxing Piano Music', path: '/music/piano/relaxing-piano-music-151497.mp3' },
  { name: 'Relaxing Piano Music Peaceful', path: '/music/piano/relaxing-piano-music-peaceful-240748.mp3' },
  { name: 'Spring Forest', path: '/music/piano/spring-forest-141216.mp3' },
  { name: 'Stress Relief Piano', path: '/music/piano/stress-relief-piano-117013.mp3' },
  // Lofi Songs
  { name: 'Blue Bunny Lofi Pink Trees', path: '/music/lofi/blue-bunny-lofi-pink-trees-251323.mp3' },
  { name: 'Mepa Exyz Physical', path: '/music/lofi/mepa-exyz-physical-7978.mp3' },
  { name: 'The Last Call', path: '/music/lofi/the-last-call-246154.mp3' },
  { name: 'Zombies Lofi', path: '/music/lofi/zombies-lofi-154347.mp3' },
  { name: 'Fat Chillin', path: '/music/lofi/fat-chillin-196099.mp3' },
  { name: 'Lofi Chill Commercial Fashion Vlog', path: '/music/lofi/lofi-chill-commercial-fashion-vlog-140858.mp3' },
  { name: 'Lofi Hip Hop', path: '/music/lofi/lofi-hip-hop-248665.mp3' },
  { name: 'Forest Guitar Lofi', path: '/music/lofi/forest-guitar-lofi-161108.mp3' },
  { name: 'Good Night Lofi Cozy Chill Music', path: '/music/lofi/good-night-lofi-cozy-chill-music-160166.mp3' },
  { name: 'Avenue Lofi 1', path: '/music/lofi/avenue-lofi-154343.mp3' },
  { name: 'Spirit Blossom', path: '/music/lofi/spirit-blossom-15285.mp3' },
  { name: 'For A Dream Lofi Vibes', path: '/music/lofi/for-a-dream-lofi-vibes-216038.mp3' },
  { name: 'Analog Dreams Lofi Vibes', path: '/music/lofi/analog-dreams-lofi-vibes-216040.mp3' },
];

const totalTracks = tracks.length
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
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length
  currentTrack.value = tracks[currentTrackIndex.value];
  currentTrackName.value = getTrackName(currentTrack.value.name)
  audioRef.value.src = currentTrack.value.path
  audioRef.value.play()
  isPlaying.value = true // auto play next track
}

const playPreviousTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.length) % tracks.length
  currentTrack.value = tracks[currentTrackIndex.value];
  currentTrackName.value = getTrackName(currentTrack.value.name)
  audioRef.value.src = currentTrack.value.path
  audioRef.value.play()
  isPlaying.value = true // auto play previous track
}

const getTrackName = (track) => {
  // if track name length is longer than 20 characters, truncate it
  if (track.length > 20) {
    return track.split('/').pop().split('.').shift().substring(0, 20) + '...'
  }
  else {
    return track.split('/').pop().split('.').shift()
  }

}

const init = () => {
  console.log("Tracks:", tracks);
  currentTrack.value = tracks[0].path;
  currentTrackName.value = tracks[0].name;
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
  // show the music player on overlay of the page in full screen mode and show the music player in the center
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
  overflow-y: auto;
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