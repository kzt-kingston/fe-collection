<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="resource-details" class="py-6">
    <div class="my-5">
      <div class="px-4">
        <div :class="title.replace(/\s+/g,'').toLowerCase() + '_header p-5 rounded-lg mb-5 text-white'">
          <div class="text-start text-lg mb-2 font-bold">{{ title }}</div>
          <div class="text-start text-md mb-5">{{resourceTitles.filter((resource) => {
            return resource.title === title;
            }).map((resource) => {
            return resource.description;
            }) }}</div>
        </div>
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
          </el-tabs>
        </div>

        <div v-if="
          hasWebsites && (activeTab === 'websites' || activeTab === 'all')
        " class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Websites</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="website in resourceData.websites" :key="website.id" class="relative">
              <component :is="isBookmarked(website.id, website.title, title)
                ? HeartOff
                : Heart
                " @click="
                  () =>
                    saveBookMark(
                      website.id,
                      website.title,
                      website.url,
                      title,
                      'websites'
                    )
                " class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10" size="20" :class="{
                  'text-red-500': isBookmarked(
                    website.id,
                    website.title,
                    title
                  ),
                }" />
              <WebsiteCard :website="website" />
            </div>
          </div>
        </div>

        <div v-if="hasVideos && (activeTab === 'videos' || activeTab === 'all')" class="mb-5">
          <h2 class="text-2xl font-semibold mb-4">Videos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="video in resourceData.videos" :key="video.id" class="relative">
              <component :is="isBookmarked(video.id, video.title, title)
                ? HeartOff
                : Heart
                " @click="
                  () =>
                    saveBookMark(
                      video.id,
                      video.title,
                      `https://www.youtube.com/watch?v=${video.id}`,
                      title,
                      'videos'
                    )
                " class="hover:text-red-500 text-gray-400 cursor-pointer absolute top-2 right-2 z-10" size="20" :class="{
                  'text-red-500': isBookmarked(
                    video.id,
                    video.title,
                    title
                  ),
                }" />
              <VideoCard :video="video" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import getData from "@/util/getData";
import { onMounted, ref, computed } from "vue";
import { getDictionary } from "@/locale/dict";
import { Heart, HeartOff } from "lucide-vue-next";
import { ElTabs } from "element-plus";
import WebsiteCard from "./WebsiteCard.vue";
import VideoCard from "./VideoCard.vue";
import resourceTitles from '../data.json';
import { useBookmarkStore } from '@/stores/bookmarkStore';

const bookmarkStore = useBookmarkStore();

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  }
});

const dict = ref({});
const activeTab = ref('all'); // Change activeTab to match ElTabs expected value type
const resourceData = ref({});

// Compute visibility conditions
const hasWebsites = computed(() => (resourceData.value?.websites?.length || 0) > 0);
const hasVideos = computed(() => (resourceData.value?.videos?.length || 0) > 0);

const websitesCount = computed(() => resourceData.value?.websites?.length || 0);
const videosCount = computed(() => resourceData.value?.videos?.length || 0);
const totalCount = computed(() => websitesCount.value + videosCount.value);

const saveBookMark = (id, title, url, category, resourceType) =>
  bookmarkStore.toggle({ id, title, url, category, resourceType });

const isBookmarked = (id, title, category) =>
  bookmarkStore.isBookmarked(id, title, category);

onMounted(async () => {
  await fetchData();
  const lang = localStorage.getItem("lang") || "en";
  dict.value = getDictionary(lang);
});

const fetchData = async () => {
  try {
    const data = await getData(props.title, "%");
    resourceData.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
</script>

<style scoped lang="scss">
@import '../../../assets/resource.scss';

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
