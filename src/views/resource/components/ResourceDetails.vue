<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- <div class="shadow-md rounded-lg my-10"> -->
    <div v-if="title != null" class="py-6">
        <!-- <h2 class="text-2xl font-bold mb-6">{{ title }}</h2> -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="detail in details" :key="detail.id" class="mb-4">
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-2">{{ detail.title }}</h3>
                    <p class="text-gray-700 mb-10">{{ detail.description }}</p>
                    <a :href="detail.url" class="text-cyan-900 bg-cyan-100 hover:bg-cyan-300 px-5 py-2 rounded-full"
                        target="_blank">Visit
                        Website</a>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h2 class="text-lg font-bold py-6 mx-10">Please select a category to see the data.</h2>
    </div>
    <!-- </div> -->
</template>

<script>
import getData from '@/util/getData';

export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            details: []
        };
    },
    async created() {
        this.fetchData()
    },
    watch: {
        // Watch for changes in the title prop
        title: {
            handler: 'fetchData', // Call fetchData method when title changes
            immediate: true // Fetch data immediately when component is first mounted
        }
    },
    methods: {
        async fetchData() {
            try {
                this.details = await getData(this.title);
                console.log('Fetched data', JSON.stringify(this.details))
            }
            catch {
                console.error('Error fetching data')
            }
        }
    }
};
</script>