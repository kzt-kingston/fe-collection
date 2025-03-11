<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { ElMessage } from 'element-plus'

const loading = ref(false)

const signInWithGitHub = async () => {
    try {
        loading.value = true
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
        });
        if (error) throw error
    } catch (error) {
        if (error instanceof Error) {
            ElMessage.error(error.message)
        }
    } finally {
        loading.value = false
    }
};
</script>

<template>
    <form class="flex flex-col items-center justify-center p-10" @submit.prevent>
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-2">Sign In</h1>
            <!-- logo -->
            <img src="/logo.jpeg" alt="Logo" class="w-24 mx-auto mb-4" />
            <p class="text-sm text-gray-600 text-center mb-6">Sign in to your account using GitHub</p>
            
            <button 
                type="button" 
                @click="signInWithGitHub" 
                class="flex items-center justify-center w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-200 shadow-sm"
                :disabled="loading"
            >
                <img src="/github.png" alt="GitHub" class="w-6 h-6 mr-3" />
                <span class="font-medium">{{ loading ? 'Connecting...' : 'Continue with GitHub' }}</span>
            </button>
        </div>
    </form>
</template>