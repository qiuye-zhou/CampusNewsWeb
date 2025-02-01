<script setup lang="ts">
const properties = defineProps({
    title: {
        type: String,
        require: true,
        default: ''
    }
})
</script>

<template>
    <div class="my-[12px] font-semibold text-gray-400">
        {{ properties.title }}
    </div>
</template>
