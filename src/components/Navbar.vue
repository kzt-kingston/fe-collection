<template>
    <div id="navbar" class="flex justify-between p-1">
        <div class="flex items-center">
            <button v-if="route.name !== 'Home'" @click="goBack" aria-label="home"
                class="text-xs hover:text-cyan-500 transition-colors ml-5">
                <House size="20" />
            </button>
        </div>
        <div class="flex justify-end p-5">
            <!-- Resource Menu -->
            <div class="flex items-center">
                <router-link to="/resource"
                    class="text-xs hover:text-cyan-500 transition-colors animate-pulse font-bold">
                    ResourceBase
                </router-link>
            </div>

            <!-- AI Tools Drop Down -->
            <div class="flex items-center mx-2">|</div>
            <div class="flex items-center">
                <el-dropdown>
                    <span class="text-xs flex items-center justify-center">
                        <MenuSquare size="20" class="text-orange-500" />
                        <ChevronDown size="13" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="drawer = true">
                                <span class="flex items-center text-sm">
                                    <Image class="mr-1" size="20" />Image Search
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <router-link to="/bookmark" class="hover:text-red-500 transition-colors">
                                    <span class="flex items-center text-sm">
                                        <Heart class="mr-1" size="20" /> Favourite Lists
                                    </span>
                                </router-link>
                            </el-dropdown-item>
                            <!-- Music -->
                            <el-dropdown-item>
                                <button aria-label="music-player" @click="$emit('toggleMusicPlayer')"
                                    :class="props.activeMusicPlayer ? `text-cyan-400 hover:text-cyan-500 transition-colors` : `text-xs hover:text-cyan-500 transition-colors`">
                                    <span class="flex items-center text-sm">
                                        <Music class="mr-1" size="20" /> Music Player
                                    </span>
                                </button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
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
    <!-- Drawer component -->
    <Drawer :drawer="drawer" @update:drawer="drawer = $event" :size="'100%'">
        <ImageSearch />
    </Drawer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Music, House, Heart, ChevronDown, Image, MenuSquare } from 'lucide-vue-next';
import Drawer from '@/components/Drawer.vue';
import ImageSearch from './AI/ImageSearch/ImageSearch.vue';

const props = defineProps({
    activeMusicPlayer: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['toggleMusicPlayer']);
const drawer = ref(false)

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
#navbar {
    // fixed top
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255);
}
</style>