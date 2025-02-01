<script setup lang="ts">
await new Promise(resolve => {
    setTimeout(() => {
        resolve('1')
    }, 3000)
})
</script>

<template>
    <div>
        <p>
            posts list
        </p>
    </div>
</template>
