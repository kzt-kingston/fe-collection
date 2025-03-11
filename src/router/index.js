import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '@/views/home/Home.vue'
import Resource from '@/views/resource/ResourceTabs.vue'
import About from '@/views/about/About.vue'
import MusicPlayer from '@/views/music-player/MusicPlayer.vue'
import SupportMe from '@/views/support-me/SupportMe.vue'
import Bookmark from '@/views/bookmark/Bookmark.vue'
import Quiz from '@/views/quiz/Quiz.vue'
import Onboarding from '@/views/onboarding/Onboarding.vue'

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
      path: '/music-player',
      name: 'MusicPlayer',
      component: MusicPlayer
    },
    {
      path: '/support-me',
      name: 'SupportMe',
      component: SupportMe
    },
    {
      path: '/bookmark',
      name: 'Bookmark',
      component: Bookmark
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: Onboarding
    }
  ]
})

export default router
