<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { NInput } from 'naive-ui';

import { buildWebSiteMenus, MenuModel } from '~/utils/menu'

import WebMenu from './WebHeader/WebMenu.vue'

const router = useRouter()
const route = computed(() => router.currentRoute.value)

const menus = ref<MenuModel[]>([])
const SearchValue = ref()

onMounted(() => {
    menus.value = buildWebSiteMenus(router.getRoutes())
})

function handleRoute(item: MenuModel) {
    router.push({
        path: item.fullPath,
        query: item.query
    })
}

function handleSearch(e: KeyboardEvent) {
    if (e.code == 'Enter' && SearchValue.value) {
        router.push({
            path: '/search/result',
            query: {
                str: SearchValue.value
            }
        })
        setTimeout(() => location.reload(), 100)
        SearchValue.value = ''
    }
}
</script>

<template>
    <div class="flex justify-center border-b-4">
        <div v-for="item in menus" class="w-24">
            <WebMenu
                :class-names="`py-3 ${route.fullPath === item.fullPath ||
                            route.fullPath.startsWith(item.fullPath)
                            ? 'active'
                            : ''}`"
                :title="item.title"
                @click="() => {
                    handleRoute(item)}"
            />
        </div>
        <div class="w-24">
            <button
                :class="`flex w-full text-sm items-center py-3
                hover:!font-black hover:!bg-transparent focus:!font-black focus:!bg-transparent`"
                @click="() => {
                    router.push({path: '/login',})}"
            >
                <p class="text-center w-full">管理入口</p>
            </button>
        </div>
        <div class="w-28 flex justify-center items-center">
            <n-input size="small" round  placeholder="搜索" clearable v-model:value="SearchValue" @keyup="handleSearch" />
        </div>
    </div>
</template>
