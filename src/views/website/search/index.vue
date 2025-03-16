<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import NewCard from '../../../components/website/NewCard/index.vue'
import { getSearch } from './http';


const router = useRouter()

const SearchValue = ref()
const SearchData = reactive({
    list: []
})

onMounted(() => {
    SearchValue.value = router.currentRoute.value.query.str
    getSearch(SearchValue.value).then((res) => {
        SearchData.list = res.data
    })
})

</script>

<template>
    <div
        class="overflow-auto w-full relative h-[100vh]
        flex items-center justify-center flex-col"
    >
        <h1 class="inline-block font-semibold m-8
                text-slate-600 bg-gradient-to-br
                transition-all select-none text-center">搜索：{{ SearchValue }}</h1>
        <NewCard v-if="SearchData.list.length > 0" v-for="item of SearchData.list" :data="item"/>
        <h1 v-else class="m-36 inline-block font-semibold px-4 py-1
                text-red-400 bg-gradient-to-br
                transition-all select-none text-center">对不起！找不到要搜索的新闻！</h1>
    </div>
</template>
