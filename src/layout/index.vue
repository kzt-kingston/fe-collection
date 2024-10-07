<script setup>
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'

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

const changeLang = (e) => {
    localStorage.setItem('lang', e.target.value)
    location.reload()
}
</script>
<template>
    <div>
        <!-- Language bar at the top right corner -->
        <div class="flex justify-end p-5">
            <div class="flex items-center">
                <select name="language" class="rounded-md text-xs" @change="changeLang">
                    <option value="en">English</option>
                    <option value="my">Myanmar</option>
                </select>
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