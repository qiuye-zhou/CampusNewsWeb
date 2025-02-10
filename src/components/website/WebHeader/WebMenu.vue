<script setup lang="ts">
import { PropType } from 'vue'

const properties = defineProps({
    title: {
        type: String,
        required: true
    },
    onClick: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: Function as PropType<() => any>,
        required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    classNames: {
        type: String
    }
})
</script>
<template>
    <button
        :class="`flex w-full text-sm items-center py-1
        hover:!font-black hover:!bg-transparent focus:!font-black focus:!bg-transparent
        ${properties.classNames}`"
        @click="properties.onClick"
    >
        <p class="text-center w-full">{{ properties.title }}</p>
    </button>
</template>
