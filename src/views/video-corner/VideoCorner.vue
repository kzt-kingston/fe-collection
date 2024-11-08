<template>
    <div class="flex flex-col md:flex-row h-screen bg-white">
      <!-- Main video player -->
      <div class="md:w-3/4 p-4">
        <div class="aspect-w-16 aspect-h-9">
          <iframe
            :src="`https://www.youtube.com/embed/${currentVideo.id}`"
            allow="autoplay; encrypted-media"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
        <h2 class="text-xl font-bold mt-4">{{ currentVideo.title }}</h2>
      </div>
  
      <!-- Video playlist -->
      <div class="md:w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">Playlist</h3>
        <ul>
          <li
            v-for="video in videos"
            :key="video.id"
            @click="setCurrentVideo(video)"
            :class="[
              'flex items-center p-2 mb-2 rounded cursor-pointer transition-colors',
              video.id === currentVideo.id
                ? 'bg-[rgb(6,182,212)] text-white'
                : 'hover:bg-gray-200',
            ]"
          >
            <img
              :src="`https://img.youtube.com/vi/${video.id}/default.jpg`"
              :alt="video.title"
              class="w-20 h-auto mr-2"
            />
            <span class="flex-grow">{{ video.title }}</span>
            <!-- <ChevronRight class="w-4 h-4" /> -->
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
//   import { ChevronRight } from 'lucide-vue'
  
  // Sample video data
  const videos = [
    { id: 'zJSY8tbf_ys', title: 'Frontend Web Development Bootcamp Course (JavaScript, HTML, CSS)' },
    { id: '44FTAS-qT8Q', title: '10 CSS PRO Tips and Tricks you NEED to know' },
    { id: 'GHZBa_R93ag', title: 'How to take your front-end skills TO THE MOON' },
    { id: 'oJYFRZ4cj2Q', title: 'The Unfiltered Thought Process of a Frontend Dev' },
    { id: '2GeMknXoGaA', title: '9 Resources to help you practice your front-end skills' },
    { id: 'QqDH5sYzDS8', title: 'Step up your front-end skills with these 5 resources' },
  ]
  
  const currentVideo = ref(videos[0])
  
  const setCurrentVideo = (video) => {
    currentVideo.value = video
  }
  </script>
  
  