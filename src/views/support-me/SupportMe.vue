<template>
  <div class="min-h-screen bg-white p-4 md:p-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-cyan-500 mb-6 text-center">{{dict.support_our_cause}}</h1>
      <p class="text-gray-600 mb-8 text-center">{{dict.your_donation_helps}}</p>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ElCard class="p-5 bg-gray-300 rounded-lg">
          <template #header>
            <div class="card-header mb-5 text-center">
              <div class="text-2xl font-bold my-2">Prompt Pay</div>
              <div>{{dict.scan_with_your}}</div>
            </div>
          </template>
          <template #footer>
            <div class="flex items-center justify-center bg-white p-5 rounded-lg">
              <img class="mx-auto rounded-lg" src="/support-me/1.prompt-pay.png" alt="Prompt Pay QR Code" />
            </div>
          </template>
        </ElCard>

        <ElCard class="p-5 bg-gray-300 rounded-lg">
          <template #header>
            <div class="card-header mb-5 text-center">
              <div class="text-2xl font-bold my-2">KBZ Pay</div>
              <div>{{dict.scan_with_your}}</div>
            </div>
          </template>
          <template #footer>
            <div class="flex items-center justify-center bg-white p-5 rounded-lg">
              <img class="mx-auto rounded-lg" src="/support-me/2.kbz-pay.png" alt="Prompt Pay QR Code" />
            </div>
          </template>
        </ElCard>

        <ElCard class="p-5 bg-gray-300 rounded-lg md:col-span-2">
          <template #header>
            <div class="card-header mb-5 text-center">
              <div class="text-2xl font-bold my-2">Card</div>
              <div>You can support me by buying a cup of coffee</div>
            </div>
          </template>
          <template #footer>
            <div class="card-header text-center">
              <button class="bg-cyan-500 w-40 text-white p-2 rounded-lg">
                <a href="https://buymeacoffee.com/kyawkingston" target="_blank" rel="noopener noreferrer">
                  Buy me a coffee
                </a>
              </button>
            </div>
          </template>
        </ElCard>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ElCard } from 'element-plus';
import { onMounted, ref } from 'vue';
import { getDictionary } from '@/locale/dict';

const dict = ref({});

onMounted(() => {
    const lang = localStorage.getItem('lang') || 'en';
    dict.value = getDictionary(lang);
});
</script>

<style scoped>
/* Add any additional styling if needed */
</style>