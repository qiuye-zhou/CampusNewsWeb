<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getTagList } from '../http';

import NewCard from '~/components/website/NewCard/index.vue'


const DataList = reactive({
    tagList: [] as any,
})

const router = useRouter()
const route = computed(() => router.currentRoute.value)

onMounted(async () => {
    getTagList(route.value.query.tag as string).then((res) => {
        DataList.tagList = res.data
    })
})
</script>

<template>
    <div
        class="overflow-auto w-full relative h-[100vh]
        flex items-center flex-col"
    >
        <h1 class="my-10 text-2xl">{{ DataList.tagList.name }}</h1>
        <p class="my-2">{{ DataList.tagList.description ?? '暂无介绍' }}</p>
        <NewCard v-if="DataList.tagList.children" v-for="item of DataList.tagList.children" :data="item"/>
        <p class="my-12" v-else>暂无该类型的新闻!!!</p>
    </div>
</template>
