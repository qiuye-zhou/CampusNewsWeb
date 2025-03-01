<script setup lang="ts">
import { NTimeline,NTimelineItem } from 'naive-ui';

import { useRouter } from 'vue-router';

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
    <div
        class="w-full relative py-8
        flex items-center justify-center"
    >
        <n-timeline size="large" class="pl-72">
            <n-timeline-item
                type="info"
                title="成功"
                content="哪里成功"
                time="2018-04-03 20:46"
                class="cursor-pointer"
                @click="handleRoute('/detail/page','test')"
            />
            <n-timeline-item
                type="info"
                title="警告"
                content="哪里警告"
                time="2018-04-03 20:46"
                class="cursor-pointer"
                @click="handleRoute('/detail/page','test')"
            />
            <n-timeline-item
                type="info"
                title="信息"
                content="是的"
                time="2018-04-03 20:46"              
                class="cursor-pointer"
                @click="handleRoute('/detail/page','test')"
            />
            <n-timeline-item
                type="info"
                title="信息"
                content="是的"
                time="2018-04-03 20:46"              
                class="cursor-pointer"
                @click="handleRoute('/detail/page','test')"
            />
            <n-timeline-item
                type="info"
                title="信息"
                content="是的"
                time="2018-04-03 20:46"              
                class="cursor-pointer"
                @click="handleRoute('/detail/page','test')"
            />
            <n-timeline-item
                type="info"
                title="信息"
                content="是的"
                time="2018-04-03 20:46"              
                class="cursor-pointer"
                @click="handleRoute('/detail/page','test')"
            />
        </n-timeline>
    </div>
</template>
