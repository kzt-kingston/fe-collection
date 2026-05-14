<script setup>
import Layout from '@/layout/index.vue'
// Auth disabled — uncomment the block below to re-enable the login gate.
// import { onMounted } from 'vue'
// import Auth from './components/Auth.vue'
// import { useRoute } from 'vue-router'
// import { useAuthStore } from '@/stores/authStore'

// const route = useRoute()
// const authStore = useAuthStore()

// onMounted(() => {
//   authStore.initialize()
// })
</script>

<template>
  <Layout>
    <router-view />
    <!-- Auth gate (disabled):
    <router-view v-if="authStore.session" />
    <router-view v-else-if="route.path === '/'" />
    <router-view v-else-if="route.path === '/support-me'" />
    <Auth v-else />
    -->
  </Layout>
</template>
