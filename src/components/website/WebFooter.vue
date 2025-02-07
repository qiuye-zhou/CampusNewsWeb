<script setup lang="ts">
import WebFooterInfo from './WebFootercom/WebFooterInfo.vue';
import RightInfo from './WebFootercom/RightInfo.vue'

</script>

<template>
    <div class="relative z-[1] border-t border-opacity-10 text-base-content/80 py-6 pb-12 bg-slate-700 text-cyan-50">
        <div class="px-4 sm:px-8">
                <div class="relative mx-auto max-w-7xl lg:px-8">
                    <WebFooterInfo/>
                    <div class='mt-3 block text-center md:absolute md:bottom-0 md:right-0 md:mt-0'>
                        <RightInfo />
                    </div>
                </div>
        </div>
    </div>
</template>
