<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
        })
        if (error) throw error
        // alert('Check your email for the login link!')
        ElMessage.success('Check your email for the login link!')
    } catch (error) {
        if (error instanceof Error) {
            // alert(error.message)
            ElMessage.error(error.message)
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form class="flex flex-col items-center justify-center p-10" @submit.prevent="handleLogin">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-2">Sign In</h1>
            <!-- logo -->
            <img src="/logo.jpeg" alt="Logo" class="w-24 mx-auto mb-4" />
            <p class="text-sm text-gray-600 text-center mb-6">Sign in via magic link with your email below</p>
            
            <div class="mb-4">
                <input 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                    required 
                    type="email" 
                    placeholder="Your email" 
                    v-model="email" 
                />
            </div>
            
            <div class="mb-2">
                <button 
                    type="submit" 
                    class="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-colors duration-200"
                    :disabled="loading"
                >
                    {{ loading ? 'Loading...' : 'Send magic link' }}
                </button>
            </div>
        </div>
    </form>
</template>