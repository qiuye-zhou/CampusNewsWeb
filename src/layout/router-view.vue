<script setup lang="ts">
import {
    NSpin
} from 'naive-ui'
import { UIStore } from '../stores/ui'
import { useStoreRef as useStoreReference } from '../hooks/useStoreRef'

const ui = useStoreReference(UIStore)

const collapse = ui.sidebarCollapse
const sidebarWidth = ui.sidebarWidth
const sidebarWidthCollapse = ui.sidebarWidthCollapse
</script>

<template>
    <router-view v-slot="{ Component }">
        <Suspense>
            <component :is="Component" />
            <template #fallback>
                <div
                    class="fixed left-1/2 top-1/2 transform
                    -translate-y-1/2 -translate-x-1/2"
                    :style="`margin-left:
                    ${!collapse ? `${sidebarWidth/2}px` : `${sidebarWidthCollapse/2}px`}`"
                >
                    <NSpin
                        :stroke-width="18"
                        show
                        rotate
                    />
                </div>
            </template>
        </Suspense>
    </router-view>
</template>
