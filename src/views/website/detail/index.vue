<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';

import { getNewDetail } from './http';
import { parseDate } from '~/utils/time';

const DataList = reactive({
    new: [] as any,
})
const currBrowse = ref(0)


const router = useRouter()

onMounted(async () => {
    getNewDetail(router.currentRoute.value.query.id as string).then((res) => {
        DataList.new = res.data
    })
})

const socket = io('http://localhost:2666/web', {
      transports: ['websocket'],
    })
    socket.connect()

    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
    })

    socket.on('message', (data: any) => {
      currBrowse.value = data.data.online
    })
</script>

<template>
    <div class="min-h-screen flex items-center flex-col">
        <h1 class="mt-10 text-2xl">{{ DataList.new.title }}</h1>
        <p class="text-xs my-2">{{ parseDate(DataList.new.created, 'yyyy 年 M 月 d 日 HH:mm:ss') }}</p>
        <p class="text-xs my-2">作者：{{ DataList.new.username }}</p>
        <p class="text-xs my-2">浏览人数：{{ DataList.new.browsenum }}</p>
        <p class="text-xs my-2">当前正在浏览人数：{{ currBrowse }}</p>
        <p class="text-lg my-2">{{ DataList.new.detail ?? '暂无介绍' }}</p>
        <pre class="p-12 whitespace-pre-wrap break-words">{{ DataList.new.text }}</pre>
    </div>
</template>
