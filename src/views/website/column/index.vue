<script setup lang="ts">
import { useRouter } from 'vue-router';

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
</template>
