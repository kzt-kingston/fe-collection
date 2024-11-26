<script setup>
import Layout from '@/layout/index.vue'
import { Analytics } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights'


</script>

<template>
  <Layout>
    <router-view />
    <Analytics />
    <SpeedInsights />
  </Layout>
</template>
