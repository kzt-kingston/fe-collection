<script setup>
import Account from '@/components/Account.vue';
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase'

const session = ref();

onMounted(async () => {
    const response = await supabase.auth.getSession()
    console.log("Response: ", response);
    session.value = response.data.session;
})

</script>
<template>
    <Account v-if="session" :session="session" />
</template>
