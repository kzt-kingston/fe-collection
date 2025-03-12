<script setup>
import { onMounted, ref } from 'vue'
import Avatar from '@/components/Avatar.vue'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

const authStore = useAuthStore()
const userStore = useUserStore()
const user = ref(authStore.user)
const userProfile = ref({})
const loading = ref(false)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

onMounted(async() => {
    userProfile.value = await userStore.getUserProfile()
    username.value = userProfile.value.username;
    website.value = userProfile.value.website;
    avatar_url.value = userProfile.value.avatar_url;
})

async function updateProfile() {
    loading.value = true
    userStore.updateUserProfile(username.value, website.value, avatar_url.value);
    loading.value = false
}
</script>

<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">Account Settings</h2>
        <form class="space-y-6" @submit.prevent="updateProfile">
            <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />

            <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="text" :value="user.email" disabled
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500" />
            </div>

            <div class="space-y-2">
                <label for="username" class="block text-sm font-medium text-gray-700">Name</label>
                <input id="username" type="text" v-model="username"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
            </div>

            <div class="space-y-2">
                <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                <input id="website" type="url" v-model="website"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
            </div>

            <div class="pt-2">
                <button type="submit"
                    class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                    :disabled="loading">
                    {{ loading ? 'Loading...' : 'Update Profile' }}
                </button>
            </div>

            <div class="border-t border-gray-200 pt-4">
                <button type="button" @click="authStore.signOut" :disabled="loading"
                    class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                    Sign Out
                </button>
            </div>
        </form>
    </div>
</template>