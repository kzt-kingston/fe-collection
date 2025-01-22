<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, ExternalLink, HeartOff } from 'lucide-vue-next'
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

// export bookmarks from local storage and download as JSON file
const exportBookmarks = () => {
    const data = JSON.stringify(bookmarks.value)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bookmarks.json'
    a.click()
    URL.revokeObjectURL(url)
}

// import bookmarks from JSON file and save to local storage as bookmarks
const importBookmarks = (file: any) => {
    if (file.raw.type !== 'application/json') {
        ElNotification({
            title: 'Invalid File Type',
            message: 'Please upload a JSON file.',
            type: 'error',
            duration: 1000
        })
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        const data = reader.result as string
        const importedBookmarks = JSON.parse(data) as Bookmark[]
        localStorage.setItem('bookmarks', JSON.stringify(importedBookmarks))
        bookmarks.value = importedBookmarks
        ElNotification({
            title: 'Bookmarks Imported',
            message: 'Bookmarks imported successfully',
            type: 'success',
            duration: 1000
        })
    }
    reader.readAsText(file?.raw as Blob)
}

// clear all bookmarks from local storage and bookmarks ref
const clearBookmarks = () => {
    bookmarks.value = []
    localStorage.removeItem('bookmarks')
    ElNotification({
        title: 'Bookmarks Cleared',
        message: 'Bookmarks cleared successfully',
        type: 'warning',
        duration: 1000
    })
}
</script>

<template>
    <div class="min-h-screen bg-white p-8">
        <h1 class="text-4xl font-bold mb-6 text-cyan-500">Bookmarks</h1>
        <p class="text-gray-500 text-sm mb-2">
            Your bookmarks are stored in your local storage. Clearing your cache will remove your bookmarks.
            If you want to keep your bookmarks, you can export them as a JSON file and import them later.
        </p>
        <!-- Create export and import bookmark feature from local storage -->
        <div class="flex space-x-2 mb-5 items-center">
            <el-button style="color: white;" type="primary" color="#06B6D4" size="small" @click="exportBookmarks">Export
            </el-button>
            <!-- import bookmark by selecting the file and import the json file and set it inside the local storage -->
            <el-upload class="inline-block" action="#" :on-change="importBookmarks" :show-file-list="false"
                :before-upload="() => false" accept=".json">
                <el-button style="color: white;" type="primary" color="#06B6D4" size="small">Import
                </el-button>
            </el-upload>
            <!-- clear all bookmarks and ask for confirmation first whether confirm to delete or not -->
            <el-popconfirm :hide-icon="true" width="200" title="Are you sure to clear all bookmarks?"
                @confirm="clearBookmarks">
                <template #reference>
                    <el-button style="color: white;" type="danger" size="small">Clear All</el-button>
                </template>
            </el-popconfirm>

        </div>

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
                            class="p-4 text-sm flex flex-col md:grid md:grid-cols-12 gap-3">
                            <!-- Mobile: Icon & Category in One Line, Title on Separate Line -->
                            <div class="md:col-span-9 w-full">
                                <div class="flex items-center space-x-3">
                                    <img v-if="bookmark.category"
                                        :src="`/resources/${bookmark.category.toLowerCase()}.png`"
                                        :alt="bookmark.category" class="w-6 h-6" />
                                    <span class="text-gray-500 text-sm">{{ bookmark.category }}</span>
                                </div>
                                <span class="block text-gray-800 font-medium truncate max-w-full mt-1">
                                    {{ bookmark.title }}
                                </span>
                            </div>

                            <!-- Right Section: Actions -->
                            <div class="md:col-span-3 flex items-center justify-end space-x-4">
                                <a :href="bookmark.url" target="_blank" rel="noopener noreferrer"
                                    class="flex items-center">
                                    <el-tooltip content="Open link" placement="top">
                                        <ExternalLink class="text-cyan-500 w-6 h-6" />
                                    </el-tooltip>
                                </a>

                                <el-tooltip content="Remove bookmark" placement="top">
                                    <HeartOff class="text-red-500 cursor-pointer"
                                        @click="() => removeBookmark(bookmark.id, bookmark.title, bookmark.url, bookmark.category)" />
                                </el-tooltip>
                            </div>
                        </li>
                    </ul>
                </template>
            </div>
        </el-card>
    </div>
</template>