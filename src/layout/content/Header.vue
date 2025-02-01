<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = computed(() => router.currentRoute.value)
</script>
<template>
    <header>
        <div class="m-6">
            <h1 class="text-lg font-medium">
                {{ route.meta.title }}
            </h1>
        </div>
    </header>
</template>
