<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Search, ExternalLink, HeartOff, Globe, Video, Info } from 'lucide-vue-next'
import { ElNotification } from 'element-plus'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useLocale } from '@/locale/useLocale'

const { dict } = useLocale()
const bookmarkStore = useBookmarkStore()
const { bookmarks } = storeToRefs(bookmarkStore)

const SEARCHING_RESULT = 'Searching Result'

const searchTerm = ref('')
const selectedCategory = ref('')

const categories = computed(() =>
    Array.from(new Set(bookmarks.value.map((b) => b.category).filter(Boolean)))
)

const categoryLabel = (category) =>
    category === SEARCHING_RESULT ? dict.searching_result : category

const categoryIcon = (category) => {
    if (!category || category === SEARCHING_RESULT) return '/resources/search.png'
    return `/resources/${category.toLowerCase()}.png`
}

const filteredBookmarks = computed(() =>
    bookmarks.value.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
        (!selectedCategory.value || bookmark.category === selectedCategory.value)
    )
)

const removeBookmark = (id, title, _url, category) => {
    bookmarkStore.remove(id, title, category)
}

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

const importBookmarks = (file) => {
    if (file.raw.type !== 'application/json') {
        ElNotification({
            title: dict.invalid_file_type,
            message: dict.upload_json,
            type: 'error',
            duration: 1000
        })
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        const importedBookmarks = JSON.parse(reader.result)
        bookmarkStore.replaceAll(importedBookmarks)
        ElNotification({
            title: dict.bookmarks_imported,
            message: dict.bookmarks_imported_msg,
            type: 'success',
            duration: 1000
        })
    }
    reader.readAsText(file?.raw)
}

const clearBookmarks = () => {
    bookmarkStore.clear()
    ElNotification({
        title: dict.bookmarks_cleared,
        message: dict.bookmarks_cleared_msg,
        type: 'warning',
        duration: 1000
    })
}
</script>

<template>
    <div class="max-w-5xl mx-auto">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-6">
            <h1 class="text-3xl font-bold text-cyan-500">{{ dict.bookmarks }}</h1>
            <div class="grid grid-cols-1 min-[420px]:grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:shrink-0">
                <el-button class="bookmark-action" type="primary" color="#06B6D4" @click="exportBookmarks">
                    {{ dict.export }}
                </el-button>
                <el-upload class="bookmark-upload" action="#" :on-change="importBookmarks" :show-file-list="false"
                    :before-upload="() => false" accept=".json">
                    <el-button class="bookmark-action" type="primary" color="#06B6D4">
                        {{ dict.import }}
                    </el-button>
                </el-upload>
                <el-popconfirm :hide-icon="true" width="220" :title="dict.clear_bookmarks_confirm"
                    @confirm="clearBookmarks">
                    <template #reference>
                        <el-button class="bookmark-action" type="danger">
                            {{ dict.clear_all }}
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>

        <div class="flex gap-3 rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-3 mb-6">
            <Info class="shrink-0 mt-0.5 text-cyan-600" :size="18" aria-hidden="true" />
            <p class="text-sm leading-relaxed text-gray-600">{{ dict.bookmarks_help }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_14rem] gap-3 mb-6">
            <el-input class="bookmark-search" size="large" :prefix-icon="Search" clearable
                :placeholder="dict.search_bookmarks" v-model="searchTerm" />
            <el-select class="bookmark-filter" size="large" clearable
                :placeholder="dict.all_categories" v-model="selectedCategory">
                <el-option :label="dict.all_categories" value="" />
                <el-option v-for="category in categories" :key="category" :label="categoryLabel(category)"
                    :value="category" />
            </el-select>
        </div>

        <el-card class="bookmark-card" shadow="never">
            <template v-if="filteredBookmarks.length === 0">
                <p class="text-center py-16 text-gray-500">{{ dict.no_bookmarks }}</p>
            </template>
            <ul v-else class="divide-y divide-gray-100">
                <li v-for="bookmark in filteredBookmarks" :key="bookmark.id + bookmark.title"
                    class="px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 transition-colors">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <img :src="categoryIcon(bookmark.category)" :alt="categoryLabel(bookmark.category)"
                                class="w-5 h-5" />
                            <Globe class="w-4 h-4 text-gray-400" v-if="bookmark.resourceType === 'websites'" />
                            <Video class="w-4 h-4 text-gray-400" v-else-if="bookmark.resourceType === 'videos'" />
                            <span>{{ categoryLabel(bookmark.category) }}</span>
                        </div>
                        <span class="block text-gray-800 font-medium truncate">
                            {{ bookmark.title }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3 shrink-0 sm:justify-end">
                        <a :href="bookmark.url" target="_blank" rel="noopener noreferrer"
                            class="text-cyan-500 hover:text-cyan-600">
                            <el-tooltip :content="dict.open_link" placement="top">
                                <ExternalLink class="w-5 h-5" />
                            </el-tooltip>
                        </a>
                        <el-tooltip :content="dict.remove_bookmark" placement="top">
                            <button type="button" class="text-red-500 hover:text-red-600"
                                :aria-label="dict.remove_bookmark"
                                @click="removeBookmark(bookmark.id, bookmark.title, bookmark.url, bookmark.category)">
                                <HeartOff class="w-5 h-5" />
                            </button>
                        </el-tooltip>
                    </div>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<style scoped>
.bookmark-action {
    width: 100%;
    margin: 0;
}

.bookmark-upload {
    display: block;
    width: 100%;
}

.bookmark-upload :deep(.el-upload) {
    display: block;
    width: 100%;
}

@media (min-width: 640px) {
    .bookmark-action,
    .bookmark-upload {
        width: auto;
    }

    .bookmark-upload :deep(.el-upload) {
        width: auto;
    }
}

.bookmark-search,
.bookmark-filter {
    width: 100%;
    min-width: 0;
}

.bookmark-search :deep(.el-input__wrapper),
.bookmark-filter :deep(.el-select__wrapper) {
    width: 100%;
    min-height: 40px;
    box-shadow: 0 0 0 1px #d1d5db inset;
}

.bookmark-search :deep(.el-input__inner) {
    width: 100%;
}

.bookmark-search :deep(.el-input__wrapper:hover),
.bookmark-search :deep(.el-input__wrapper.is-focus),
.bookmark-filter :deep(.el-select__wrapper:hover),
.bookmark-filter :deep(.el-select__wrapper.is-focused) {
    box-shadow: 0 0 0 1px #06b6d4 inset;
}

.bookmark-card :deep(.el-card__body) {
    padding: 0;
}
</style>
