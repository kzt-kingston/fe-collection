<script setup>
import { computed, ref, watch } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { useLocale } from '@/locale/useLocale';
import { hasMoreSentences, visibleSentences } from '../previewDescription';

const props = defineProps({
  sentences: {
    type: Array,
    default: () => [],
  },
});

const { dict } = useLocale();
const expanded = ref(false);

watch(
  () => props.sentences,
  () => {
    expanded.value = false;
  },
);

const canExpand = computed(() => hasMoreSentences(props.sentences));
const visibleText = computed(() => visibleSentences(props.sentences, expanded.value).join(' '));

const toggle = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <div class="text-start text-md mb-5">
    <p class="leading-relaxed">{{ visibleText }}</p>
    <button
      v-if="canExpand"
      type="button"
      class="mt-2 inline-flex items-center gap-1 text-sm font-semibold underline decoration-current/40 underline-offset-4 hover:decoration-current"
      :aria-expanded="expanded"
      @click="toggle"
    >
      <ChevronUp v-if="expanded" class="h-4 w-4 shrink-0" :stroke-width="2.5" />
      <ChevronDown v-else class="h-4 w-4 shrink-0" :stroke-width="2.5" />
      {{ expanded ? dict.see_less : dict.see_more }}
    </button>
  </div>
</template>
