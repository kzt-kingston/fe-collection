<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import resourceTitles from './data.json';
import ResourceDetails from './components/ResourceDetails.vue';
import { getDictionary } from '@/locale/dict';

const router = useRouter();
const selectedTitle = ref("");
const openDialog = ref(false);
const className = ref(null);
const dict = ref({});

onMounted(() => {
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);
});

// go back history
const goBack = () => {
  router.go(-1);
}

// show resource details
const showResourceDetails = (title, cssClass) => {
  console.log('Selected title:', title);
  console.log('Selected cssClass:', cssClass);
  selectedTitle.value = title;
  openDialog.value = true;
  className.value = cssClass + '_resource';
}
</script>
<template>

  <!-- Back Button -->
  <img src="/back.png" alt="back" class="cursor-pointer mb-5" width="30px" @click="goBack" />

  <!-- <h1 class="text-2xl mb-5 font-bold">Choose a category:</h1> -->

  <!-- Grid Display Data for resources -->
  <div class="grid my-10 grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
    <div v-for="resourceTitle in resourceTitles" :key="resourceTitle.id">
      <div @click="showResourceDetails(resourceTitle.title, resourceTitle.class)" :key="resourceTitle.id"
        class="cursor-pointer">
        <div class="block h-[100px] text-md text-wrap font-bold p-6 shadow-md rounded-lg align-middle all-resource"
          :class="resourceTitle.class">
        </div>
        <div class="my-5 text-center text-md font-semibold">{{
          resourceTitle.title }}</div>
      </div>
    </div>
  </div>

  <TransitionRoot as="template" :show="openDialog">
    <Dialog class="relative z-10" @close="openDialog = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl md:max-w-4xl">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-gray-900 text-center mb-5">{{
                      selectedTitle
                      }}
                    </DialogTitle>
                    <div class="block h-[100px]" :class="className">
                    </div>
                    <div class="mt-2">
                      <!-- Show ResourceDetails component based on selectedTitle -->
                      <ResourceDetails :title="selectedTitle" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="openDialog = false" ref="cancelButtonRef">{{dict.close}}</button>
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
  background-color: #d4f4fd;
  transform: scale(1.1);
  transition: transform 0.5s;
}
</style>