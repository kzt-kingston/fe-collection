<template>
    <div>
        <p class="text-center font-semibold">You can find and learn many different resources and improve your skills by answering Quiz!</p>
        <div class="flex mx-auto items-center justify-center">
            <div class="relative w-full max-w-4xl overflow-hidden" @mouseenter="pauseAutoRotate"
                @mouseleave="resumeAutoRotate">
                <div class="flex items-center justify-center h-64 md:h-80">
                    <TransitionGroup name="carousel" tag="div" class="flex items-center justify-center w-full">
                        <div v-for="logo in visibleLogos" :key="`${logo.id}-${logo.position}`" :class="cn(
                        'transition-all duration-700 ease-in-out transform px-2 md:px-4',
                        logo.position === 'center' ? 'scale-100 z-10' :
                            logo.position === 'left' ? 'scale-75 opacity-70 -translate-x-4' :
                                'scale-75 opacity-70 translate-x-4'
                    )">
                            <div class="relative">
                                <img :src="logo.src || '/placeholder.svg'" :alt="logo.alt"
                                    :width="logo.position === 'center' ? 200 : 150"
                                    :height="logo.position === 'center' ? 200 : 150" :class="cn(
                                    'rounded-lg shadow-md transition-all duration-500 p-5'
                                )" />
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@/util/cn';

const props = defineProps({
    logos: Array,
    autoRotateInterval: {
        type: Number,
        default: 3000
    }
});

const currentIndex = ref(0);
const logoCount = computed(() => props.logos.length);
let interval = null;
let isPaused = ref(false);

const visibleLogos = computed(() => {
    const prevIndex = (currentIndex.value - 1 + logoCount.value) % logoCount.value;
    const nextIndex = (currentIndex.value + 1) % logoCount.value;

    return [
        { ...props.logos[prevIndex], position: 'left' },
        { ...props.logos[currentIndex.value], position: 'center' },
        { ...props.logos[nextIndex], position: 'right' }
    ];
});

// Keep automatic rotation functionality but remove user controls
const pauseAutoRotate = () => {
    isPaused.value = true;
};

const resumeAutoRotate = () => {
    isPaused.value = false;
};

onMounted(() => {
    interval = setInterval(() => {
        if (!isPaused.value) {
            currentIndex.value = (currentIndex.value + 1) % logoCount.value;
        }
    }, props.autoRotateInterval);
});

onUnmounted(() => {
    if (interval) clearInterval(interval);
});
</script>

<style scoped>
.carousel-move {
  transition: all 0.7s ease;
}

.carousel-enter-active {
  transition: all 0.7s ease;
  position: absolute;
  opacity: 0;
}

.carousel-leave-active {
  transition: all 0.7s ease;
  position: absolute;
  opacity: 0;
}

.carousel-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.carousel-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
