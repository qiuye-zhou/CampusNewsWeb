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
    collapse: {
        type: Boolean,
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
        hover:!text-white hover:!bg-transparent focus:!text-white focus:!bg-transparent
        ${properties.classNames}`"
        @click="properties.onClick"
    >
        <span
            class="flex basis-12 items-center justify-center"
        >
            <slot />
        </span>
        <span
            :class="`${properties.collapse ?
                'hidden' : ''}`"
        >{{ properties.title }}</span>
    </button>
</template>
