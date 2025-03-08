<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NCard, NTag } from 'naive-ui'
import DetailIcon from '~/components/icons/list/DetailIcon.vue';

const props = defineProps(['data'])

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
    <n-card :title="props.data.title" size="small" header-style="" content-style="">
        <template #header-extra>
            <div class="w-48 flex justify-between">
                <n-tag type="info">{{ props.data.typename }}</n-tag>
                <p class="flex justify-center items-center cursor-pointer" @click="handleRoute('/detail/page', props.data._id)">详细内容<DetailIcon/></p>
            </div>
        </template>
        <p class="m-2">{{ props.data.detail }}</p>
    </n-card>
</template>
