<script setup>
import { ref, toRefs, watchEffect } from 'vue'
import { supabase } from '@/supabase'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const prop = defineProps(['path', 'size'])
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()
const userStore = useUserStore()

const loadImage = async () => {
  src.value = await userStore.downloadImage(path.value)
}

const uploadAvatar = async (evt) => {
    files.value = evt.target.files
    try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file = files.value[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${Math.random()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

        if (uploadError) throw uploadError
        ElMessage.success('Upload successful!')
        emit('update:path', filePath)
        emit('upload')
    } catch (error) {
        ElMessage.error(error.message)
    } finally {
        uploading.value = false
    }
}

watchEffect(() => {
    if (path.value) {
        loadImage()
    }
})
</script>

<template>
  <div class="flex flex-col items-center space-y-2">
    <!-- Simple avatar display -->
    <div>
      <img 
        v-if="src" 
        :src="src" 
        alt="Avatar" 
        class="rounded-full border border-gray-300"
        :style="{ height: size + 'em', width: size + 'em' }" 
      />
      <div 
        v-else 
        class="rounded-full bg-gray-200 flex items-center justify-center"
        :style="{ height: size + 'em', width: size + 'em' }"
      >
        <!-- Simple user icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-1/2 w-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <!-- Simplified upload button -->
    <div :style="{ width: size + 'em' }">
      <label 
        class="block w-full text-center py-1 px-2 bg-gray-200 hover:bg-gray-300 rounded text-sm cursor-pointer"
        for="single"
      >
        {{ uploading ? 'Uploading...' : 'Upload' }}
      </label>
      <input 
        class="hidden" 
        type="file" 
        id="single" 
        accept="image/*"
        @change="uploadAvatar" 
        :disabled="uploading" 
      />
    </div>
  </div>
</template>