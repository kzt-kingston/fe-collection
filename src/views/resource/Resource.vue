<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, computed, watch } from 'vue'; // Add watch
import resourceTitles from './data.json';
import { getDictionary } from '@/locale/dict';
import getData, { searchForData } from '@/util/getData';
import { ElInput, ElNotification, ElTabs, ElTabPane } from 'element-plus'; // Add ElTabs imports
import { Search, Heart, HeartOff, X } from 'lucide-vue-next'; // Add X icon import
import WebsiteCard from './components/WebsiteCard.vue';
import VideoCard from './components/VideoCard.vue';
import PlaygroundCard from './components/PlaygroundCard.vue';
import { debounce } from 'lodash'; // Add debounce import

const dict = ref({});
const searchResult = ref(null);
const activeTab = ref('all'); // Change activeTab to match ElTabs expected value type
const inputData = ref(''); // Add missing ref

// Create a debounced search function
const debouncedSearch = debounce((searchText) => {
  if (!searchText) {
    searchResult.value = null;
    return;
  }
  searchResult.value = searchForData(searchText);
  console.log('Search result:', searchResult.value);
}, 300);

// Watch for input changes
watch(() => inputData.value, (newValue) => {
  debouncedSearch(newValue);
});

// Add bookmarks state
const bookmarks = ref([]);

// Add bookmark methods
const saveBookMark = (id, title, url, resourceType) => {
  const bookmark = { id, title, url, resourceType, category: "Searching Result" };

  // Check if bookmark already exists
  const index = bookmarks.value.findIndex(
    (b) => b.id === id && b.title === title
  );

  if (index !== -1) {
    // Remove from bookmarks
    bookmarks.value.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks.value));
    ElNotification({
      title: "Bookmark Removed",
      message: "Bookmark removed successfully",
      type: "info",
      duration: 1000,
    });
  } else {
    // Add to bookmarks
    bookmarks.value.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks.value));
    ElNotification({
      title: "Bookmark Saved",
      message: "Bookmark saved successfully",
      type: "success",
      duration: 1000,
    });
  }
};

// Reactive check for bookmarked status
const isBookmarked = (id, title) => {
  return bookmarks.value.some(
    (bookmark) =>
      bookmark.id === id &&
      bookmark.title === title
  );
};

onMounted(() => {
  const lang = localStorage.getItem('lang') || 'en';
  dict.value = getDictionary(lang);
  // Load bookmarks from localStorage
  bookmarks.value = JSON.parse(localStorage.getItem("bookmarks")) || [];
  // Perform initial search if there's any input value
  if (inputData.value) {
    debouncedSearch(inputData.value);
  }
});

// Compute visibility conditions
const hasWebsites = computed(() => (searchResult.value?.websites?.length || 0) > 0);
const hasVideos = computed(() => (searchResult.value?.videos?.length || 0) > 0);
const hasPlayground = computed(() => (searchResult.value?.playground?.length || 0) > 0);

// Add computed properties for counts
const websitesCount = computed(() => {
  console.log('Websites length:', searchResult.value?.websites?.length);
  return searchResult.value?.websites?.length || 0;
});

const videosCount = computed(() => {
  console.log('Videos length:', searchResult.value?.videos?.length);
  return searchResult.value?.videos?.length || 0;
});

const playgroundCount = computed(() => {
  console.log('Playground length:', searchResult.value?.playground?.length);
  return searchResult.value?.playground?.length || 0;
});

const totalCount = computed(() => {
  const total = websitesCount.value + videosCount.value + playgroundCount.value;
  console.log('Total count:', total);
  return total;
});

const openNewResourceTab = (title) => {
  emits("openNewTab", title);
}

const categories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Developer Tools',
  'Design Resources',
  'UI/UX Enhancements',
  'Miscellaneous'
];

const emits = defineEmits(['openNewTab']);

// Add clear search function
const clearSearch = () => {
  inputData.value = '';
  searchResult.value = null;
};

</script>
<template>
  <div>
    <!-- Update search bar with clear button -->
    <div class="my-5 relative">
      <el-input class="w-full" size="large" :placeholder="dict.search_resources" :prefix-icon="Search"
        v-model="inputData">
        <template #suffix>
          <X v-if="inputData" @click="clearSearch" class="cursor-pointer hover:text-cyan-500" size="16" />
        </template>
      </el-input>
    </div>

    <!-- search result -->
    <div v-if="searchResult" class="my-5">
      <div class="px-4 py-4">
        <h1 class="text-3xl font-bold mb-6">{{ dict.search_result }}</h1>

        <!-- Replace buttons with ElTabs -->
        <div class="mb-8">
          <el-tabs v-model="activeTab" class="demo-tabs">
            <el-tab-pane label="All" name="all">
              <template #label>
                <span class="flex items-center gap-2">
                  All
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ totalCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>

            <el-tab-pane v-if="hasWebsites" name="websites">
              <template #label>
                <span class="flex items-center gap-2">
                  Websites
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ websitesCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>

            <el-tab-pane v-if="hasVideos" name="videos">
              <template #label>
                <span class="flex items-center gap-2">
                  Videos
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ videosCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>

            <el-tab-pane v-if="hasPlayground" name="playground">
              <template #label>
                <span class="flex items-center gap-2">
                  Playground
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ playgroundCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div v-if="hasWebsites && (activeTab === 'websites' || activeTab === 'all')" class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Websites</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="website in searchResult.websites" :key="website.id" class="relative">
              <component :is="isBookmarked(website.id, website.title) ? HeartOff : Heart"
                @click="() => saveBookMark(website.id, website.title, website.url, 'websites')"
                class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10" size="20" :class="{
                  'text-red-500': isBookmarked(website.id, website.title),
                }" />
              <WebsiteCard :website="website" />
            </div>
          </div>
        </div>

        <div v-if="hasVideos && (activeTab === 'videos' || activeTab === 'all')" class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Videos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="video in searchResult.videos" :key="video.id" class="relative">
              <component :is="isBookmarked(video.id, video.title) ? HeartOff : Heart"
                @click="() => saveBookMark(video.id, video.title, `https://www.youtube.com/watch?v=${video.id}`, 'videos')"
                class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10" size="20" :class="{
                  'text-red-500': isBookmarked(video.id, video.title),
                }" />
              <VideoCard :video="video" />
            </div>
          </div>
        </div>

        <div v-if="hasPlayground && (activeTab === 'playground' || activeTab === 'all')" class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Playground</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="playground in searchResult.playground" :key="playground.id" class="relative">
              <component :is="isBookmarked(playground.id, playground.title) ? HeartOff : Heart"
                @click="() => saveBookMark(playground.id, playground.title, playground.url, 'playground')"
                class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10" size="20" :class="{
                  'text-red-500': isBookmarked(playground.id, playground.title),
                }" />
              <PlaygroundCard :playground="playground" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- map the categories -->
    <div v-else v-for="category in categories" :key="category" class="w-full">
      <h3 class="text-lg font-bold leading-6 mb-5">{{ category }}</h3>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        <div v-for="resource in resourceTitles.filter(r => r.category === category)" :key="resource.id">
          <div @click="openNewResourceTab(resource.title)" class="cursor-pointer">
            <div class="block h-[100px] text-md text-wrap font-bold p-6 shadow-md rounded-lg align-middle all-resource"
              :class="resource.class">
            </div>
            <div class="my-5 text-center text-md font-semibold">{{ resource.title }}</div>
          </div>
        </div>
      </div>
      <!-- show divider and don't show if it is the last one-->
      <div v-if="category !== categories[categories.length - 1]" class="border-b border-gray-300 mb-5"></div>
    </div>

  </div>

</template>

<style scoped lang="scss">
// import resource: .scss;
@import '../../assets/resource.scss';

.all-resource:hover {
  background-color: rgb(6, 182, 212);
  transform: scale(1.1);
  transition: transform 0.5s;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
}

:deep(.el-tabs__item) {
  font-size: 14px;

  &.is-active {
    color: rgb(6, 182, 212);
  }

  &:hover {
    color: rgb(6, 182, 212);
  }
}

:deep(.el-tabs__active-bar) {
  background-color: rgb(6, 182, 212);
}

:deep(.el-input__suffix) {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>