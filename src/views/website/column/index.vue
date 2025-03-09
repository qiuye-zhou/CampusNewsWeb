<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { NCard } from 'naive-ui'

import { getAllType } from './http';

const DataList = reactive({
    typeList: [] as any,
})

const router = useRouter()
function handleRoute(item: string, tag: string) {
    router.push({
        path: item,
        query: {
            tag: tag
        }
    })
}

onMounted(async () => {
    getAllType().then((res) => {
        DataList.typeList = res.data
    })
})
</script>

<template>
    <div
        class="w-full relative min-h-screen
        flex items-center justify-center flex-wrap"
    >
        <n-card v-for="item of DataList.typeList" :title="item.name" size="huge" header-style="border-width: 2px;" content-style="border-width: 2px;">
            <template #header-extra>
                <p style="cursor: pointer;"  @click="handleRoute('/column/tag', item._id)">更多</p>
            </template>
             <p>{{ item.description ?? '暂无介绍' }}</p>
        </n-card>
    </div>
</template>
