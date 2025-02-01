<script setup lang="ts">
import {
    NConfigProvider,
    NNotificationProvider,
    NMessageProvider,
    NDialogProvider,
    darkTheme,
    dateZhCN,
    zhCN
} from 'naive-ui'
import { useUIStore } from './stores/ui'
import { useUserStore } from './stores/user'
import { onMounted } from 'vue'

const uiStore = useUIStore()

const { naiveUIDark } = uiStore
const { fetchUser } = useUserStore()

onMounted(() => {
    fetchUser().then(() => {
        console.log('App.vue fetchUser')
    })
})

</script>

<template>
    <NConfigProvider
        :locale="zhCN"
        :date-locale="dateZhCN"
        :theme="naiveUIDark.value? darkTheme : null"
        class="min-h-screen dark:bg-[#201e1e]"
    >
        <NNotificationProvider>
            <NMessageProvider>
                <NDialogProvider>
                    <router-view />
                </NDialogProvider>
            </NMessageProvider>
        </NNotificationProvider>
    </NConfigProvider>
</template>

<style scoped>
</style>
