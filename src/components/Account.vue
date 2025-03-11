<script setup>
import { supabase } from '@/supabase'
import { onMounted, ref, toRefs } from 'vue'
import Avatar from '@/components/Avatar.vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

onMounted(() => {
    getProfile()
})

async function getProfile() {
    try {
        loading.value = true
        const { user } = session.value

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single()

        console.log("Data: ", data);
        console.log("Error: ", error);
        console.log("Status: ", status);
        if (error && status !== 406) throw error

        if (data) {
            username.value = data.username
            website.value = data.website
            avatar_url.value = data.avatar_url
        }
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

async function updateProfile() {
    try {
        loading.value = true
        const { user } = session.value

        const updates = {
            id: user.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_url.value,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) throw error

        ElMessage.success('Profile updated successfully!')

    } catch (error) {
        ElMessage.error(error.message)
    } finally {
        loading.value = false
    }
}

async function signOut() {
    try {
        loading.value = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        ElMessage.error(error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">Account Settings</h2>
        <form class="space-y-6" @submit.prevent="updateProfile">
            <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />

            <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="text" :value="session.user.email" disabled
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
                <button type="button" @click="signOut" :disabled="loading"
                    class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                    Sign Out
                </button>
            </div>
        </form>
    </div>
</template>