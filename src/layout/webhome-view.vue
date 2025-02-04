<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { bgUrl } from '../constants/env'

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
        <div
            class="fixed top-0 left-0 right-0 bottom-0 -m-4 blur-sm
            bg-cover bg-center bg-no-repeat bg-gray-500
            ease-linear transition-opacity duration-700"
            :style="{ backgroundImage: `url(${bgUrl})`, opacity: loaded ? 1 : 0.4 }"
        />

        <router-view />
    </div>
</template>
