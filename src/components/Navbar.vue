<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { Music, House, Heart, ChevronDown, Image, Menu, X, Puzzle, Shapes } from 'lucide-vue-next';
import Drawer from '@/components/Drawer.vue';
import ImageSearch from './AI/ImageSearch/ImageSearch.vue';
import { useLocale } from '@/locale/useLocale';

const { dict, lang, setLang } = useLocale();

const props = defineProps({
    activeMusicPlayer: {
        type: Boolean,
        default: false
    }
})
const router = useRouter()
const route = useRoute()
const emit = defineEmits(['toggleMusicPlayer']);
const imageSearchOpen = ref(false)
const mobileMenuOpen = ref(false)

const goHome = () => {
    mobileMenuOpen.value = false
    router.push('/')
}

const changeLang = (e) => {
    setLang(e.target.value)
}

const navLinkClass = (name) => [
    'flex items-center gap-1.5 text-sm hover:text-cyan-500 transition-colors',
    route.name === name ? 'text-cyan-500 font-semibold' : 'text-gray-700',
]

const mobileItemClass = (name) => [
    'flex items-center gap-3 px-5 py-3 text-sm hover:bg-cyan-50 transition-colors',
    route.name === name ? 'text-cyan-500 font-semibold bg-cyan-50' : 'text-gray-800',
]

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
}

const openImageSearch = () => {
    closeMobileMenu()
    imageSearchOpen.value = true
}

const toggleMusic = () => {
    closeMobileMenu()
    emit('toggleMusicPlayer')
}

watch(() => route.fullPath, closeMobileMenu)
</script>
<template>
    <div id="navbar">
        <div class="flex h-14 items-center justify-between px-4">
            <button v-if="route.name !== 'Home'" type="button" @click="goHome" aria-label="home"
                class="text-gray-700 hover:text-cyan-500 transition-colors">
                <House size="22" />
            </button>
            <span v-else class="text-sm font-semibold text-cyan-500">Frontend Collection</span>

            <!-- Desktop nav -->
            <div class="hidden md:flex items-center justify-end gap-4">
                <router-link to="/resource" :class="navLinkClass('Resource')">
                    <Shapes size="18" />
                    {{ dict.resources }}
                </router-link>
                <router-link to="/quiz" :class="navLinkClass('Quiz')">
                    <Puzzle size="18" />
                    {{ dict.quiz }}
                </router-link>
                <router-link to="/bookmark" :class="navLinkClass('Bookmark')">
                    <Heart size="18" />
                    {{ dict.bookmarks }}
                </router-link>
                <el-dropdown>
                    <button type="button" :aria-label="dict.more_tools"
                        class="flex items-center gap-1 text-sm text-gray-700 hover:text-cyan-500">
                        <Menu size="20" />
                        <ChevronDown size="14" />
                    </button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="imageSearchOpen = true">
                                <span class="flex items-center text-sm">
                                    <Image class="mr-2" size="18" />{{ dict.image_search }}
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="emit('toggleMusicPlayer')">
                                <span class="flex items-center text-sm"
                                    :class="props.activeMusicPlayer ? 'text-cyan-500' : ''">
                                    <Music class="mr-2" size="18" /> {{ dict.music_player }}
                                </span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <a href="https://github.com/kzt-kingston/fe-collection" target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub repository"
                    class="text-gray-700 hover:text-cyan-500 transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                </a>
                <select name="language" class="rounded-md text-xs border border-gray-200 px-1 py-1" :value="lang"
                    @change="changeLang">
                    <option value="en">English</option>
                    <option value="my">မြန်မာ</option>
                </select>
            </div>

            <!-- Mobile: language + hamburger -->
            <div class="flex md:hidden items-center gap-3">
                <select name="language" class="rounded-md text-xs border border-gray-200 px-1 py-1 max-w-[7.5rem]"
                    :value="lang" @change="changeLang">
                    <option value="en">English</option>
                    <option value="my">မြန်မာ</option>
                </select>
                <button type="button" class="text-gray-800 hover:text-cyan-500 p-1" :aria-label="dict.menu"
                    :aria-expanded="mobileMenuOpen" @click="mobileMenuOpen = !mobileMenuOpen">
                    <X v-if="mobileMenuOpen" size="24" />
                    <Menu v-else size="24" />
                </button>
            </div>
        </div>

        <!-- Mobile menu list -->
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-100 bg-white shadow-md">
            <nav class="flex flex-col py-1" :aria-label="dict.menu">
                <router-link to="/resource" :class="mobileItemClass('Resource')" @click="closeMobileMenu">
                    <Shapes size="20" />
                    {{ dict.resources }}
                </router-link>
                <router-link to="/quiz" :class="mobileItemClass('Quiz')" @click="closeMobileMenu">
                    <Puzzle size="20" />
                    {{ dict.quiz }}
                </router-link>
                <router-link to="/bookmark" :class="mobileItemClass('Bookmark')" @click="closeMobileMenu">
                    <Heart size="20" />
                    {{ dict.bookmarks }}
                </router-link>
                <button type="button" class="flex items-center gap-3 px-5 py-3 text-sm text-gray-800 hover:bg-cyan-50 text-left"
                    @click="openImageSearch">
                    <Image size="20" />
                    {{ dict.image_search }}
                </button>
                <button type="button"
                    class="flex items-center gap-3 px-5 py-3 text-sm text-left hover:bg-cyan-50"
                    :class="props.activeMusicPlayer ? 'text-cyan-500 font-semibold' : 'text-gray-800'"
                    @click="toggleMusic">
                    <Music size="20" />
                    {{ dict.music_player }}
                </button>
                <a href="https://github.com/kzt-kingston/fe-collection" target="_blank" rel="noopener noreferrer"
                    class="flex items-center gap-3 px-5 py-3 text-sm text-gray-800 hover:bg-cyan-50"
                    @click="closeMobileMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                </a>
            </nav>
        </div>
    </div>
    <Drawer :drawer="imageSearchOpen" @update:drawer="imageSearchOpen = $event" :size="'100%'">
        <ImageSearch />
    </Drawer>
</template>
<style lang="scss" scoped>
#navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #fff;
    border-bottom: 1px solid #f3f4f6;
}
</style>
