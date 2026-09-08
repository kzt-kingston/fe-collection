<script setup>
import { ref, watch, nextTick } from 'vue';
import { X } from 'lucide-vue-next';
import Resource from './Resource.vue';
import ResourceDetails from './components/ResourceDetails.vue';

// Define tabs data and state
const tabs = ref([
    { id: '1', title: 'Choose Resource' },
]);
const activeTab = ref(tabs.value[0].id);
const tabsContainer = ref(null);

// Add a new tab
const addTab = (title) => {
    const newTab = {
        id: String(tabs.value.length + 1),
        title: title,
    };
    tabs.value.push(newTab);
    activeTab.value = newTab.id;
};

// Remove a tab
const removeTab = (tabId) => {
    const newTabs = tabs.value.filter((tab) => tab.id !== tabId);
    tabs.value = newTabs;
    if (activeTab.value === tabId) {
        activeTab.value = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : '';
    }
};

const openNewTab = (title) => {
    addTab(title);
};

watch(activeTab, async (newVal) => {
    await nextTick();
    const container = tabsContainer.value;
    const tabEl = container?.querySelector(`[data-tab-id="${newVal}"]`);
    if (tabEl) {
        tabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
    window.scrollTo(0, 0);
});
</script>

<template>
    <div id="resource-tabs" class="w-full mx-auto">
        <div class="tab-bar-sticky sticky top-24 z-40 bg-white md:top-20 md:-mt-5">
            <div id="tab-container" class="bg-white border rounded-t-lg">
                <div ref="tabsContainer" class="flex h-10 overflow-x-auto">
                    <div class="flex h-10 min-w-max pr-3">
                        <div v-for="tab in tabs" :key="tab.id" :data-tab-id="tab.id"
                            class="relative flex h-full shrink-0 items-center text-sm font-medium gap-2 px-4 whitespace-nowrap rounded-t-lg cursor-pointer"
                            :class="{ 'bg-cyan-500 text-white': tab.id === activeTab }" @click="activeTab = tab.id">
                            <img v-if="tab.id !== '1'" :src="'/resources/' + tab.title.toLowerCase() + '.png'"
                                class="h-4 w-4 shrink-0" />
                            {{ tab.title }}
                            <button v-if="tab.id !== '1'" :id="tab.id" class="h-4 w-4 p-0 opacity-50 hover:opacity-100"
                                @click.stop="removeTab(tab.id)">
                                <X class="h-3 w-3" />
                                <span class="sr-only">Close tab</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tabs.length > 0">
            <div v-for="tab in tabs" :key="tab.id" v-show="tab.id === activeTab"
                class="border-x border-b rounded-b-lg p-4 bg-white">
                <div v-if="tab.id === '1'">
                    <Resource v-on:open-new-tab="openNewTab" />
                </div>
                <div v-else>
                    <ResourceDetails :title="tab.title" />
                </div>
            </div>
        </div>
        <div v-else class="text-center p-4 border-x border-b rounded-b-lg bg-white">
            No tabs open. Click the plus icon to add a new tab.
        </div>
    </div>
</template>

<style scoped>
.tab-bar-sticky {
    /* Cover the gap between the navbar and the tab bar while scrolling */
    box-shadow: 0 -24px 0 0 #fff;
}
</style>
