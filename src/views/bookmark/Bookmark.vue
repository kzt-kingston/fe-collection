<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, ExternalLink, Heart } from 'lucide-vue-next'
import { ElNotification } from 'element-plus';

const searchTerm = ref('')
const selectedCategory = ref(null)

interface Bookmark {
    id: number;
    title: string;
    url: string;
    category: string;
    resourceType: string;
}

// get all bookmarks from local storage
const getBookmarks = (): Bookmark[] => {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
};

const bookmarks = ref<Bookmark[]>(getBookmarks());

const categories = Array.from(new Set(bookmarks.value.map(b => b.category)))

const filteredBookmarks = computed(() =>
    bookmarks.value.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
        (!selectedCategory.value || bookmark.category === selectedCategory.value)
    )
)

const removeBookmark = (id: number, title: string, url: string, category: string) => {
    const index = bookmarks.value.findIndex(b => b.id === id && b.title === title && b.category === category)
    if (index !== -1) {
        bookmarks.value.splice(index, 1)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
        ElNotification({
            title: 'Bookmark Removed',
            message: 'Bookmark removed successfully',
            type: 'info',
            duration: 1000
        })
    }
}

const clearCategory = () => {
    selectedCategory.value = null
}

const selectCategory = (category: string) => {
    selectedCategory.value = category
    console.log(selectedCategory.value)
}
</script>

<template>
    <div class="min-h-screen bg-white p-8">
        <h1 class="text-4xl font-bold mb-6 text-cyan-500">Bookmarks</h1>

        <div class="mb-6 grid sm:grid-cols-2">
            <div class="relative w-full col-span-1 flex items-center">
                <input class="pl-10 p-2 rounded-lg border border-cyan-500" type="text" placeholder="Search bookmarks..."
                    v-model="searchTerm" />
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="20" />
            </div>
            <div class="w-full col-span-1 max-sm:mt-5">
                <el-select placeholder="Select">
                    <el-option label="All" value="" @click="clearCategory"></el-option>
                    <el-option v-for="category in categories" :key="category" :label="category" :value="category"
                        @click="selectCategory(category)">
                    </el-option>
                </el-select>
            </div>
        </div>

        <el-card class="overflow-hidden">
            <div class="p-0">
                <template v-if="filteredBookmarks.length === 0">
                    <p class="text-center py-8 text-gray-500">No bookmarks found.</p>
                </template>
                <template v-else>
                    <ul class="divide-y divide-gray-200">
                        <li v-for="bookmark in filteredBookmarks" :key="bookmark.id + bookmark.category"
                            class="p-4 items-center text-sm grid md:grid-cols-12">
                            <div class="md:col-span-9 flex items-center my-2">
                                <img v-if="bookmark.category" :src="`/resources/${bookmark.category.toLowerCase()}.png`"
                                    :alt="bookmark.category" class="w-6 h-6 mr-5" />
                                <span class="text-gray-500 text-sm w-20 mr-5">{{ bookmark.category }}</span>
                                <span class="text-gray-800 min-w-62 mr-5">{{ bookmark.title }}</span>
                            </div>
                            <div class="md:col-span-3 flex items-center">
                                <a :href="bookmark.url" target="_blank" rel="noopener noreferrer"
                                    class="items-center space-x-4 mr-5 w-10">
                                    <!-- <span class="text-cyan-500 font-semibold w-8">{{ bookmark.id }}.</span> -->
                                    <el-tooltip content="Open link" placement="top">
                                        <ExternalLink class="text-cyan-500 w-6 h-6" />
                                    </el-tooltip>
                                </a>
                                <div class="w-10">
                                    <el-tooltip class="w-[50px]" content="Remove bookmark" placement="top">
                                        <Heart class="text-red-500 cursor-pointer"
                                            @click="() => removeBookmark(bookmark.id, bookmark.title, bookmark.url, bookmark.category)" />
                                    </el-tooltip>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
            </div>
        </el-card>
    </div>
</template>
