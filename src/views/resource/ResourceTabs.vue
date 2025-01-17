<script setup>
import { ref, watch, nextTick } from 'vue';
import { LayoutDashboard, Plus, X } from 'lucide-vue-next';
import Resource from './Resource.vue';
import ResourceDetails from './components/ResourceDetails.vue';

// Define tabs data and state
const tabs = ref([
    { id: '1', title: 'Choose Resource', resourceType: '' },
]);
const activeTab = ref(tabs.value[0].id);
const tabsContainer = ref(null);

// Add a new tab
const addTab = (title, resourceType) => {
    const newTab = {
        id: String(tabs.value.length + 1),
        title: title,
        resourceType: resourceType,
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

const openNewTab = (title, resourceType) => {
    console.log("Open new tab", title, resourceType);
    addTab(title, resourceType);
};

// function to show the choose resource tab
const showChooseResourceTab = () => {
    activeTab.value = '1';
    // go back to the top of the page
    window.scrollTo(0, 0);
};

watch(activeTab, async (newVal) => {
    await nextTick();
    const container = tabsContainer.value;
    const tabEl = container?.querySelector(`[data-tab-id="${newVal}"]`);
    if (tabEl) {
        tabEl.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
    window.scrollTo(0, 0);
});
</script>

<template>
    <div id="resource-tabs" class="w-full mx-auto">
        <!-- Choose Resource button to show the resources back -->
        <div class="flex justify-end mb-5">
            <button type="button" name="Choose Resource" @click="showChooseResourceTab"
                class="fixed z-50 top-[80px] items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800">
                <LayoutDashboard class="h-4 w-4" />
            </button>
        </div>
        <div id="tab-container" ref="tabsContainer"
            class="flex items-center bg-background border rounded-t-lg overflow-x-scroll">

            <!-- Tabs -->
            <div class="h-10 bg-transparent flex">
                <div v-for="tab in tabs" :key="tab.id" :data-tab-id="tab.id"
                    class="relative flex items-center gap-2 px-4 py-2 whitespace-nowrap rounded-t-lg cursor-pointer"
                    :class="{ 'bg-cyan-500 text-white': tab.id === activeTab }" @click="activeTab = tab.id">
                    <img v-if="tab.id !== '1'" :src="'/resources/' + tab.title.toLowerCase() + '.png'"
                        class="h-4 w-4" />
                    {{ tab.title + " " + tab.resourceType }}
                    <button v-if="tab.id !== '1'" :id="tab.id" class="h-4 w-4 p-0 opacity-50 hover:opacity-100"
                        @click.stop="removeTab(tab.id)">
                        <X class="h-3 w-3" />
                        <span class="sr-only">Close tab</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="tabs.length > 0">
            <div v-for="tab in tabs" :key="tab.id" v-show="tab.id === activeTab"
                class="border-x border-b rounded-b-lg p-4 bg-background">
                <div v-if="tab.id === '1'">
                    <Resource v-on:open-new-tab="openNewTab" />
                </div>
                <div v-else>
                    <ResourceDetails :title="tab.title" :resource-type="tab.resourceType" />
                </div>
            </div>
        </div>
        <div v-else class="text-center p-4 border-x border-b rounded-b-lg bg-background">
            No tabs open. Click the plus icon to add a new tab.
        </div>
    </div>
</template>

<style scoped>
.bg-muted {
    background-color: #f1f1f1;
    /* Example muted background color */
}
</style>
