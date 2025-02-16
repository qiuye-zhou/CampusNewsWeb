<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NBackTop } from 'naive-ui'
import { bgUrl } from '../constants/env'

import WebHeader from '~/components/website/WebHeader.vue';
import WebFooter from '~/components/website/WebFooter.vue';

const loaded = ref(false)

onMounted(() => {
    const $image = new Image()
    $image.src = bgUrl
    $image.addEventListener('load', () => {
        loaded.value = true
    })
})
</script>

<template>
    <div class="transitions">
        <WebHeader/>
        <div>
            <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" />
            </Suspense>
            </router-view>
        <n-back-top class="z-10" :right="30" :bottom="100" />
        </div>
        <WebFooter/>
    </div>
</template>
<style scoped>
.transitions {
    transition: left 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
:is([data-theme="dark"] .transitions) {
    background-color: transparent;
    color: aliceblue;
    background: #2f2f2f;
}
</style>