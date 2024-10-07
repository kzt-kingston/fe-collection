import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '@/views/home/Home.vue'
import Resource from '@/views/resource/Resource.vue'
import About from '@/views/about/About.vue'
import MusicPlayer from '@/views/music-player/MusicPlayer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/resource',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/music-palyer',
      name: 'MusicPlayer',
      component: MusicPlayer
    }
  ]
})

export default router
