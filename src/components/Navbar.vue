<template>
    <div id="navbar" class="flex justify-between p-1">
        <div class="flex items-center">
            <button v-if="route.name !== 'Home'" @click="goBack"
                class="text-xs hover:text-cyan-500 transition-colors ml-5">
                <House size="20" />
            </button>
        </div>
        <div class="flex justify-end p-5">
            <!-- Resource Menu -->
            <div class="flex items-center">
                <router-link to="/resource" class="text-xs hover:text-cyan-500 transition-colors">
                    Resource
                </router-link>
            </div>
            <!-- line break -->
            <div class="flex items-center mx-2">|</div>

            <!-- Video Corner Menu -->
            <div class="flex items-center">
                <router-link to="/video-corner" class="text-xs hover:text-cyan-500 transition-colors">
                    Video Corner
                </router-link>
            </div>
            <!-- line break -->
            <div class="flex items-center mx-2">|</div>

            <!-- Music Player Menu -->
            <div class="flex items-center">
                <button @click="$emit('toggleMusicPlayer')" :class="props.activeMusicPlayer ? `text-xs text-cyan-400 hover:text-cyan-500 transition-colors` : `text-xs hover:text-cyan-500 transition-colors`">
                    <Music size="20" />
                </button>
            </div>
            <!-- line break -->
            <div class="flex items-center mx-2">|</div>
            <!-- Language Dropdown -->
            <div class="flex items-center">
                <select name="language" class="rounded-md text-xs" @change="changeLang">
                    <option value="en">English</option>
                    <option value="my">မြန်မာ</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { Music, House } from 'lucide-vue-next';

const props = defineProps({
    activeMusicPlayer: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['toggleMusicPlayer']);

// go back history
const goBack = () => {
    // router.go(-1)
    router.push('/')
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

const changeLang = (e) => {
    localStorage.setItem('lang', e.target.value)
    location.reload()
}
</script>
<style lang="scss" scoped>
#navbar{
    // fixed top
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255);
}
</style>