<template>
    <el-drawer :show-close="true" :title="props.title" :size="props.size" v-model="drawer" @close="updateDrawer(false)">
        <slot></slot>
    </el-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    drawer: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: '30%'
    },
    title: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:drawer'])

const drawer = ref(props.drawer)

watch(() => props.drawer, (newVal) => {
    drawer.value = newVal
})

const updateDrawer = (value) => {
    drawer.value = value
    emit('update:drawer', value)
}
</script>
