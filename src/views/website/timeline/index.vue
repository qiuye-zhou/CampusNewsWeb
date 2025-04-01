<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { NTimeline,NTimelineItem } from 'naive-ui';

import { useRouter } from 'vue-router';
import { getTimeLine } from './http';
import { parseDate } from '~/utils/time';

const DataList = reactive({
    timelineList: [] as any,
})

const router = useRouter()

function handleRoute(item: string, id: string) {
    router.push({
        path: item,
        query: {
            id: id
        }
    })
}

onMounted(async () => {
    getTimeLine().then((res) => {
        DataList.timelineList = res.data
    })
})
</script>

<template>
    <div
        class="w-full relative py-8 pl-72 min-h-screen
        flex items-center justify-center"
    >
        <n-timeline size="large" class="flex justify-center items-start">
            <n-timeline-item
                v-for="item of DataList.timelineList"
                type="info"
                :title="item.title"
                :content="item.detail"
                :time="parseDate(item.created, 'yyyy 年 M 月 d 日 HH:mm:ss')"
                class="cursor-pointer"
                @click="handleRoute('/detail/page', item._id)"
            />
        </n-timeline>
    </div>
</template>
