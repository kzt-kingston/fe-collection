import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    {
      path: '/resource',
      name: 'Resource',
      component: () => import('@/views/resource/ResourceTabs.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/about/About.vue'),
    },
    {
      path: '/music-player',
      name: 'MusicPlayer',
      component: () => import('@/views/music-player/MusicPlayer.vue'),
    },
    {
      path: '/bookmark',
      name: 'Bookmark',
      component: () => import('@/views/bookmark/Bookmark.vue'),
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: () => import('@/views/quiz/Quiz.vue'),
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: () => import('@/views/onboarding/Onboarding.vue'),
    },
  ],
})

export default router
