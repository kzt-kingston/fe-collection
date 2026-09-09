<script setup>
import { Heart } from 'lucide-vue-next';
import { useLocale } from '@/locale/useLocale';

defineProps({
  bookmarked: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['toggle']);

const { dict } = useLocale();
</script>

<template>
  <button type="button" class="absolute top-2 right-2 z-10"
    :aria-label="bookmarked ? dict.remove_bookmark : dict.add_bookmark" @click.stop="$emit('toggle')">
    <Heart :size="20" :fill="bookmarked ? 'currentColor' : 'none'"
      :class="bookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'" />
  </button>
</template>
