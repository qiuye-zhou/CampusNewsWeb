<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NCard } from 'naive-ui'
import DetailIcon from '~/components/icons/list/DetailIcon.vue';

const router = useRouter()
function handleRoute(item: string, id: string) {
    router.push({
        path: item,
        query: {
            id: id
        }
    })
}
</script>

<template>
    <n-card title="titlees" size="small" header-style="" content-style="">
        <template #header-extra>
            <p class="flex justify-center items-center cursor-pointer" @click="handleRoute('/detail/page', 'id111')">详细内容<DetailIcon/></p>
        </template>
        <p class="m-2">简介、介绍</p>
    </n-card>
</template>
