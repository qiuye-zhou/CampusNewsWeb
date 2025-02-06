<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { bgUrl } from '../constants/env'

import WebHeader from '~/components/website/WebHeader.vue';
import WebFooter from '~/components/website/WebFooter.vue';

const loaded = ref(false)

onMounted(() => {
    const $image = new Image()
    $image.src = bgUrl
    $image.addEventListener('load', () => {
        loaded.value = true
    })
})
</script>

<template>
    <div>
        <WebHeader/>
        <router-view />
        <WebFooter/>
    </div>
</template>
