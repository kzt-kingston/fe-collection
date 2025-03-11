<script setup>
import Layout from '@/layout/index.vue'
import { onMounted, ref } from 'vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'
import { useRoute } from 'vue-router'

const session = ref()
const route = useRoute()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <Layout>
    <router-view v-if="session" />
    <router-view v-else-if="route.path === '/'" />
    <Auth v-else />
  </Layout>
</template>
