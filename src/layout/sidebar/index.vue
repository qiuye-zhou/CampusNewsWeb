<script setup lang="ts">
import { NLayoutContent } from 'naive-ui'
import { computed, watchEffect } from 'vue'
import Sidebar from '~/components/sidebar/index.vue'
import { UIStore } from '~/stores/ui'
import { useStoreRef as useStoreReference } from '~/hooks/useStoreRef'
import Content from '../content/index.vue'
import { useRoute } from 'vue-router'

const ui = useStoreReference(UIStore)

const collapse = ui.sidebarCollapse
const sidebarWidth = ui.sidebarWidth
const sidebarWidthCollapse = ui.sidebarWidthCollapse

const isLaptop = computed(
    () => ui.viewport.value.mobile || ui.viewport.value.pad
)
watchEffect(() => {
    collapse.value = !!isLaptop.value
})
const route = useRoute()
</script>

<template>
    <div>
        <Sidebar
            :collapse="collapse"
            :width="sidebarWidth"
            :sidebar-width-collapse="sidebarWidthCollapse"
            :collapse-change="(s: boolean) => collapse = s"
        />
        <NLayoutContent
            embedded
            class="w-max p-4 fixed inset-0 overflow-hidden transitions"
            :native-scrollbar="false"
            :style="{ left: !collapse ? `${sidebarWidth}px` : `${sidebarWidth - 150}px`,
                      pointerEvents: isLaptop && !collapse ? 'none' : 'auto' }"
        >
            <Content :key="route.fullPath" />
        </NLayoutContent>
    </div>
</template>

<style scoped>
.transitions {
    transition: left 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
:is([data-theme="dark"] .transitions) {
    background-color: transparent;
}
</style>
