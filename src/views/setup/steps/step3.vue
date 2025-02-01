<script setup lang="ts">
import { NSpace, NButton } from 'naive-ui'

const handleNext = async () => {
    localStorage.setItem('to-setting', 'true')
    setTimeout(() => {
        location.reload()
    }, 300)
}
</script>

<template>
    <NSpace
        class="text-center mt-2"
        vertical
    >
        <span class="text-sm">你已经完成了所有的设置步骤！</span>
        <NButton
            size="small"
            round
            type="primary"
            @click="handleNext"
        >
            START
        </NButton>
    </NSpace>
</template>
