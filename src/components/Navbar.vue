<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Music, House, Heart, ChevronDown, Image, MenuSquare, Puzzle, Shapes } from 'lucide-vue-next';
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
defineEmits(['toggleMusicPlayer']);
const drawer = ref(false)

// go back history
const goBack = () => {
    // router.go(-1)
    router.push('/')
}

onMounted(async () => {
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
                    class="text-xs hover:text-cyan-500 transition-colors animate-pulse font-bold border-2 border-cyan-500 px-2 py-1 rounded-md">
                    Start Here
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
                            <router-link to="/bookmark" class="hover:text-red-500 transition-colors">
                                <el-dropdown-item>
                                    <span class="flex items-center text-sm">
                                        <Heart class="mr-1" size="20" /> Bookmarks
                                    </span>
                                </el-dropdown-item>
                            </router-link>
                            <!-- Music -->
                            <el-dropdown-item @click="$emit('toggleMusicPlayer')">
                                <button aria-label="music-player"
                                    :class="props.activeMusicPlayer ? `text-cyan-400 hover:text-cyan-500 transition-colors` : `text-xs hover:text-cyan-500 transition-colors`">
                                    <span class="flex items-center text-sm">
                                        <Music class="mr-1" size="20" /> Music Player
                                    </span>
                                </button>
                            </el-dropdown-item>
                            <!-- Quiz -->
                            <router-link to="/resource" class="hover:text-red-500 transition-colors">
                                <el-dropdown-item divided>
                                    <span class="flex items-center text-sm">
                                        <Shapes class="mr-1" size="20" /> ResourceBase
                                    </span>
                                </el-dropdown-item>
                            </router-link>
                            <router-link to="/quiz" class="hover:text-red-500 transition-colors">
                                <el-dropdown-item divided>
                                    <span class="flex items-center text-sm">
                                        <Puzzle class="mr-1" size="20" /> Quiz
                                    </span>
                                </el-dropdown-item>
                            </router-link>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <!-- line break -->
            <div class="flex items-center mx-2">|</div>
            <!-- GitHub Repo -->
            <div class="flex items-center">
                <a href="https://github.com/kzt-kingston/fe-collection" target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub repository"
                    class="text-xs hover:text-cyan-500 transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                </a>
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