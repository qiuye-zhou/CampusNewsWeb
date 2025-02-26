<script setup lang="ts">
import {
    onMounted, provide, reactive
} from 'vue'
import { NCard } from 'naive-ui'

import NewCard from '~/components/website/NewCard/index.vue'
import Carousel from '~/components/website/Carousel/index.vue'

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
        class="w-full relative
        flex items-center justify-center flex-wrap"
    >
        <Carousel/>
        <n-card title="最近" size="huge" header-style="border-width: 2px;" content-style="border-width: 2px;">
            <NewCard/>
            <NewCard/>
            <NewCard/>
        </n-card>
        <n-card title="推荐" size="huge" header-style="border-width: 2px;" content-style="border-width: 2px;">
            <NewCard/>
        </n-card>
    </div>
</template>