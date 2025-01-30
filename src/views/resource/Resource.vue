<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref, onMounted } from 'vue';
import resourceTitles from './data.json';
import { getDictionary } from '@/locale/dict';
import getData from '@/util/getData';

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

onMounted(() => {
  const lang = localStorage.getItem('lang') || 'en';
  dict.value = getDictionary(lang);
});

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
</script>
<template>
  <div>
    <!-- map the categories -->
    <div v-for="category in categories" :key="category" class="w-full">
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
</style>