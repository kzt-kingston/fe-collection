<template>
    <div class="bg-gradient-to-r from-pink-300 to-purple-300 p-6 rounded-xl shadow-lg max-w-xs mx-auto">
      <div class="bg-white rounded-lg p-4 shadow-inner">
        <div class="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <img
            src="/placeholder.svg?height=128&width=256"
            alt="Album cover"
            class="w-full h-full object-cover"
          />
        </div>
        <h2 class="text-lg font-semibold text-gray-800 mb-1">{{ currentTrackName }}</h2>
        <p class="text-sm text-gray-600 mb-4">Adorable Artist</p>
        <div class="h-1 w-full bg-gray-200 rounded-full mb-4">
          <div
            class="h-1 bg-pink-500 rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <div class="flex justify-between items-center">
          <button @click="skipBackward" class="text-gray-600 hover:text-pink-500 transition-colors">
            <SkipBack size="24" />
          </button>
          <button
            @click="togglePlayPause"
            class="bg-pink-500 text-white rounded-full p-3 hover:bg-pink-600 transition-colors"
          >
            <component :is="isPlaying ? Pause : Play" size="24" />
          </button>
          <button @click="skipForward" class="text-gray-600 hover:text-pink-500 transition-colors">
            <SkipForward size="24" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { Play, Pause, SkipBack, SkipForward } from 'lucide-vue-next'
  
  // Array of music files (update paths as needed)
  const tracks = [
    require('@/assets/music/song1.mp3'),
    require('@/assets/music/song2.mp3'),
    require('@/assets/music/song3.mp3')
  ]
  
  const isPlaying = ref(false)
  const progress = ref(0)
  const currentTrack = ref(tracks[0])
  const currentTrackIndex = ref(0)
  const currentTrackName = ref('Song 1')
  
  const audioRef = ref(null)
  
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
    currentTrack.value = tracks[currentTrackIndex.value]
    currentTrackName.value = `Song ${currentTrackIndex.value + 1}`
    audioRef.value.src = currentTrack.value
    audioRef.value.play()
  }
  
  onMounted(() => {
    audioRef.value = new Audio(currentTrack.value)
    audioRef.value.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.value.addEventListener('ended', playNextTrack)
    audioRef.value.play() // Start autoplay when component loads
    isPlaying.value = true
  })
  
  onUnmounted(() => {
    if (audioRef.value) {
      audioRef.value.removeEventListener('timeupdate', handleTimeUpdate)
      audioRef.value.removeEventListener('ended', playNextTrack)
    }
  })
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  