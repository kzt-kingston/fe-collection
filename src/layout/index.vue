<script setup>
import Footer from '@/components/Footer.vue'
</script>
<template>
    <div>
        <div class="max-w-4xl mx-auto p-5">
            <slot />
        </div>
        <div class="w-full mx-auto">
            <Footer />
        </div>
    </div>
</template>