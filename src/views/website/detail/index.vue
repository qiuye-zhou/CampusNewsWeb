<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const route = computed(() => router.currentRoute.value)

</script>

<template>
    <div
        class="overflow-auto w-full relative h-[100vh]
        flex items-center justify-center"
    >
        <h1>detail新闻详细页面: {{route.fullPath}}</h1>
    </div>
</template>
