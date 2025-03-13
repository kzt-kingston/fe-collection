<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Music, House, Heart, ChevronDown, Image, MenuSquare, Puzzle, Shapes, CircleUser, CircleUserRound, LogOut } from 'lucide-vue-next';
import Drawer from '@/components/Drawer.vue';
import ImageSearch from './AI/ImageSearch/ImageSearch.vue';
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
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
                <router-link :to="authStore.session ? '/onboarding' : '/register'"
                    class="text-xs hover:text-cyan-500 transition-colors animate-pulse font-bold border-2 border-cyan-500 px-2 py-1 rounded-md">
                    Start Here
                </router-link>
            </div>

            <!-- AI Tools Drop Down -->
            <div v-if="authStore.session" class="flex items-center mx-2">|</div>
            <div v-if="authStore.session" class="flex items-center">
                <el-dropdown>
                    <span class="text-xs flex items-center justify-center">
                        <MenuSquare size="20" class="text-orange-500" />
                        <ChevronDown size="13" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <router-link to="/account" class="hover:text-blue-500 transition-colors">
                                <el-dropdown-item>
                                    <span class="flex items-center text-sm">
                                        <CircleUser class="mr-1" size="20" /> Account Settings
                                    </span>
                                </el-dropdown-item>
                            </router-link>
                            <el-dropdown-item @click="drawer = true" divided>
                                <span class="flex items-center text-sm">
                                    <Image class="mr-1" size="20" />Image Search
                                </span>
                            </el-dropdown-item>
                            <router-link to="/bookmark" class="hover:text-red-500 transition-colors">
                                <el-dropdown-item divided>
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
                            <el-dropdown-item divided @click="authStore.signOut">
                                <span class="flex items-center text-sm">
                                    <LogOut class="mr-1" size="20" /> Sign Out
                                </span>
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