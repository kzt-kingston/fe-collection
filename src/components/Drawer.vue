<template>
    <el-drawer :show-close="true" :title="props.title" :size="props.size" v-model="drawer" @close="updateDrawer(false)">
        <slot></slot>
    </el-drawer>
</template>

<script lang="ts" setup>
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

const drawer = ref(props.drawer)

watch(() => props.drawer, (newVal) => {
    drawer.value = newVal
})

const updateDrawer = (value: boolean) => {
    drawer.value = value
    emit('update:drawer', value)
}

const emit = defineEmits(['update:drawer'])
</script>
