<script setup lang="ts">
import {
    onMounted, provide, reactive
} from 'vue'

import { configtype } from './type'

const defaultConfigs = reactive<configtype>({})
provide('configs', defaultConfigs)

onMounted(async () => {
    const configs = await Promise
    Object.assign(defaultConfigs, configs)
})
</script>

<template>
    <div
        class="overflow-auto w-full relative h-[100vh]
        flex items-center justify-center"
    >
        <h1>webhome</h1>
    </div>
</template>
