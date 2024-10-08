<script setup>
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// go back history
const goBack = () => {
    router.go(-1)
}

onMounted(() => {
    // check the local storage for the language and if not set yet, set it to 'en'
    const lang = localStorage.getItem('lang')
    if (!lang) {
        localStorage.setItem('lang', 'en')
    }
    else {
        // set the selected language in the dropdown
        document.querySelector('select[name="language"]').value = lang

    }
})

console.log("Router name:", route.name)    // check the router name

const changeLang = (e) => {
    localStorage.setItem('lang', e.target.value)
    location.reload()
}
</script>
<template>
    <div>
        <div class="flex justify-between p-1">
            <div class="flex items-center">
                <button v-if="route.name !== 'Home'" @click="goBack"
                    class="text-xs hover:text-cyan-500 transition-colors ml-5">
                    Back
                </button>
            </div>
            <div class="flex justify-end p-5">
                <!-- Music Player Menu -->
                <div class="flex items-center">
                    <router-link to="/music-player" class="text-xs hover:text-cyan-500 transition-colors">
                        Music Player
                    </router-link>
                </div>
                <!-- line break -->
                <div class="flex items-center mx-2">|</div>
                <!-- Language Dropdown -->
                <div class="flex items-center">
                    <select name="language" class="rounded-md text-xs" @change="changeLang">
                        <option value="en">English</option>
                        <option value="my">Myanmar</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto p-5">
            <slot />
        </div>
        <div class="w-full mx-auto">
            <Footer />
        </div>
    </div>
</template>