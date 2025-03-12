<script setup>
import Layout from '@/layout/index.vue'
import { onMounted } from 'vue'
import Auth from './components/Auth.vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <Layout>
    <router-view v-if="authStore.session" />
    <router-view v-else-if="route.path === '/'" />
    <Auth v-else />
  </Layout>
</template>
