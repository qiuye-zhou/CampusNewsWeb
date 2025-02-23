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
        flex items-center justify-center"
    >
        <h1>column</h1>
        <hr/>
        <button class="bg-slate-300" @click="handleRoute('/column/tag', 'test')">tets tag button: tagtest</button>
    </div>
</template>
