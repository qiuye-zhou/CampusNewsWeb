<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NCard } from 'naive-ui'

import NewCard from '~/components/website/NewCard/index.vue'

const router = useRouter()
function handleRoute(item: string, tag: string) {
    router.push({
        path: item,
        query: {
            tag: tag
        }
    })
}
</script>

<template>
    <div
        class="w-full relative min-h-screen
        flex items-center justify-center flex-wrap"
    >
        <Carousel/>
        <n-card title="专栏1" size="huge" header-style="border-width: 2px;" content-style="border-width: 2px;">
            <template #header-extra>
                <p style="cursor: pointer;"  @click="handleRoute('/column/tag', '11111')">更多</p>
            </template>
            <!-- <NewCard/> -->
        </n-card>
        <n-card title="专栏2" size="huge" header-style="border-width: 2px;" content-style="border-width: 2px;">
            <template #header-extra>
                <p style="cursor: pointer;"  @click="handleRoute('/column/tag', '22222')">更多</p>
            </template>
            <!-- <NewCard/> -->
        </n-card>
        <n-card title="专栏3" size="huge" header-style="border-width: 2px;" content-style="border-width: 2px;">
            <template #header-extra>
                <p style="cursor: pointer;"  @click="handleRoute('/column/tag', '33333')">更多</p>
            </template>
            <!-- <NewCard/> -->
        </n-card>
    </div>
</template>

<!-- <template>
    <div
        class="overflow-auto w-full relative h-[100vh]
        flex items-center justify-center flex-wrap"
    >
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test1')">学科信息: test1</div>
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test2')">学科信息: test2</div>
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test3')">学科信息: test3</div>
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test')">学科信息: test</div>
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test')">学科信息: test</div>
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test')">学科信息: test</div>
        <div size="large" class="cursor-pointer border-4 p-12 mx-12 my-0"  @click="handleRoute('/column/tag', 'test')">学科信息: test</div>
    </div>
</template> -->
