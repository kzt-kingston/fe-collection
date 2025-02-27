<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref, onMounted, computed, watch } from 'vue'; // Add watch
import resourceTitles from './data.json';
import { getDictionary } from '@/locale/dict';
import getData, {searchForData} from '@/util/getData';
import { ElInput, ElNotification, ElTabs, ElTabPane } from 'element-plus'; // Add ElTabs imports
import { Search, Heart, HeartOff, X } from 'lucide-vue-next'; // Add X icon import
import WebsiteCard from './components/WebsiteCard.vue';
import VideoCard from './components/VideoCard.vue';
import PlaygroundCard from './components/PlaygroundCard.vue';
import { debounce } from 'lodash'; // Add debounce import

const selectedTitle = ref("");
const selectedDescription = ref("");
const openDialog = ref(false);
const className = ref(null);
const dict = ref({});
const selectedResourceType = ref(""); // websites | videos | playground
const hideResourceDetails = ref({
  websites: false,
  videos: false,
  playground: false
})
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
const saveBookMark = (id, title, url, category, resourceType) => {
  const bookmark = { id, title, url, category, resourceType };
  
  // Check if bookmark already exists
  const index = bookmarks.value.findIndex(
    (b) => b.id === id && b.title === title && b.category === category
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
const isBookmarked = (id, title, category) => {
  return bookmarks.value.some(
    (bookmark) =>
      bookmark.id === id &&
      bookmark.title === title &&
      bookmark.category === category
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

const checkAvailableData = (type) => {
  const data = getData(selectedTitle.value, type);
  if (data) {
    return false;
  }
  return true;
}

const showHideResourceDetails = () => {
  hideResourceDetails.value.websites = checkAvailableData('websites');
  hideResourceDetails.value.videos = checkAvailableData('videos');
  hideResourceDetails.value.playground = checkAvailableData('playground');
}

// show resource details
const showResourceDetails = (title, cssClass, description) => {
  // clear previous selected resource
  selectedResourceType.value = "";
  console.log('Selected title:', title);
  console.log('Selected cssClass:', cssClass);
  selectedTitle.value = title;
  selectedDescription.value = description;

  // check if data is available for each resource type
  showHideResourceDetails();
  console.log("showHideResourceDetails", hideResourceDetails.value);

  openDialog.value = true;
  className.value = cssClass + '_resource';
}

const showSelectedResource = (type) => {
  console.log('Selected resource type:', type);
  selectedResourceType.value = type;
  emits("openNewTab", selectedTitle.value, type);
  // close dialog
  openDialog.value = false;
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
      <el-input 
        class="w-full" 
        size="large" 
        :placeholder="dict.search_resources" 
        :prefix-icon="Search" 
        v-model="inputData"
      >
        <template #suffix>
          <X
            v-if="inputData"
            @click="clearSearch"
            class="cursor-pointer hover:text-cyan-500"
            size="16"
          />
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
                  <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ totalCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>
            
            <el-tab-pane v-if="hasWebsites" name="websites">
              <template #label>
                <span class="flex items-center gap-2">
                  Websites
                  <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ websitesCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>

            <el-tab-pane v-if="hasVideos" name="videos">
              <template #label>
                <span class="flex items-center gap-2">
                  Videos
                  <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
                    {{ videosCount }}
                  </span>
                </span>
              </template>
            </el-tab-pane>

            <el-tab-pane v-if="hasPlayground" name="playground">
              <template #label>
                <span class="flex items-center gap-2">
                  Playground
                  <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-cyan-500 rounded-full">
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
              <component 
                :is="isBookmarked(website.id, website.title, selectedTitle) ? HeartOff : Heart"
                @click="() => saveBookMark(website.id, website.title, website.url, selectedTitle, 'websites')"
                class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10"
                size="20"
                :class="{
                  'text-red-500': isBookmarked(website.id, website.title, selectedTitle),
                }"
              />
              <WebsiteCard :website="website" />
            </div>
          </div>
        </div>

        <div v-if="hasVideos && (activeTab === 'videos' || activeTab === 'all')" class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Videos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="video in searchResult.videos" :key="video.id" class="relative">
              <component 
                :is="isBookmarked(video.id, video.title, selectedTitle) ? HeartOff : Heart"
                @click="() => saveBookMark(video.id, video.title, `https://www.youtube.com/watch?v=${video.id}`, selectedTitle, 'videos')"
                class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10"
                size="20"
                :class="{
                  'text-red-500': isBookmarked(video.id, video.title, selectedTitle),
                }"
              />
              <VideoCard :video="video" />
            </div>
          </div>
        </div>

        <div v-if="hasPlayground && (activeTab === 'playground' || activeTab === 'all')" class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Playground</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="playground in searchResult.playground" :key="playground.id" class="relative">
              <component 
                :is="isBookmarked(playground.id, playground.title, selectedTitle) ? HeartOff : Heart"
                @click="() => saveBookMark(playground.id, playground.title, playground.url, selectedTitle, 'playground')"
                class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10"
                size="20"
                :class="{
                  'text-red-500': isBookmarked(playground.id, playground.title, selectedTitle),
                }"
              />
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
          <div @click="showResourceDetails(resource.title, resource.class, resource.description)"
            class="cursor-pointer">
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

  <TransitionRoot as="template" :show="openDialog">
    <Dialog class="relative z-10" @close="openDialog = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex mt-20 justify-center p-4 text-center">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:w-full sm:max-w-xl md:max-w-4xl">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="grid">
                  <div class="text-center">
                    <!-- <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-cyan-500 text-center mb-5">{{
                      selectedTitle
                      }}
                    </DialogTitle> -->
                    <!-- <div class="text-center text-md mb-5">{{ selectedDescription }}</div> -->
                    <div class="block w-full h-[100px]" :class="className">
                    </div>

                    <div class="text-start text-md mt-5 mb-2 font-bold">{{ selectedTitle }}</div>

                    <div class="text-start text-md mb-5">{{ selectedDescription }}</div>

                    <div class="my-5">
                      {{ dict.choose_resource }}
                    </div>
                    <div class="mb-10">
                      <div class="grid grid-cols-2 gap-4">
                        <div v-if="!hideResourceDetails.websites"
                          class="bg-white shadow-md rounded-lg p-5 text-center hover:bg-cyan-500 cursor-pointer hover:text-white"
                          @click="() => showSelectedResource('websites')">
                          <img src="/websites.png" alt="websites" class="w-20 h-20 mx-auto mb-5">
                          Websites
                        </div>
                        <div v-if="!hideResourceDetails.videos"
                          class="bg-white shadow-md rounded-lg p-5 text-center hover:bg-cyan-500 cursor-pointer hover:text-white"
                          @click="() => showSelectedResource('videos')">
                          <img src="/videos.png" alt="videos" class="w-20 h-20 mx-auto mb-5">
                          Videos
                        </div>
                        <div v-if="!hideResourceDetails.playground"
                          class="bg-white shadow-md rounded-lg p-5 text-center hover:bg-cyan-500 cursor-pointer hover:text-white"
                          @click="() => showSelectedResource('playground')">
                          <img src="/playground.png" alt="playground" class="w-20 h-20 mx-auto mb-5">
                          Playground
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="openDialog = false" ref="cancelButtonRef">{{ dict.close }}</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

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