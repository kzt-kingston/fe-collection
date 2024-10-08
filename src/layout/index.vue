<script setup>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue';
</script>
<template>
    <div>
        <Navbar />
        <div class="max-w-4xl mx-auto p-5 min-h-screen">
            <slot />
        </div>
        <div class="w-full mx-auto">
            <Footer />
        </div>
    </div>
</template>