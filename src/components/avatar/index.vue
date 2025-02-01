<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const properties = defineProps({
    size: {
        type: Number,
        default: 50
    },
    src: {
        type: String,
        required: true
    }
})

const loaded = ref(false)

const preloadImage = () => {
    if (!properties.src) {
        return
    }
    const $img = new Image()
    $img.src = properties.src

    $img.addEventListener('load', () => {
        loaded.value = true
    })
}
onMounted(() => {
    preloadImage()
})

watch(
    () => properties.src,
    () => {
        preloadImage()
    }
)
</script>

<template>
    <div
        class="mb-3 inline-block rounded-full relative overflow-hidden select-none"
        :style="{ height: `${size}px`, width: `${size}px` }"
    >
        <img
            class="rounded-full h-full max-w-full bg-slate-300"
            :src="src"
            :style="{ display: loaded ? '' : 'none' }"
        >
    </div>
</template>
