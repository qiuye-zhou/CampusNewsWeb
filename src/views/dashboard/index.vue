<script setup lang="ts">
import { ref } from 'vue'
import { useStoreRef as useStoreReference } from '~/hooks/useStoreRef'
import { useUserStore } from '~/stores/user'
import { parseDate } from '~/utils/time'

const userStore = useStoreReference(useUserStore)
const statTime = ref(null as unknown as Date)
</script>

<template>
    <div>
        <h1 class="text-2xl font-light my-9">
            欢迎回来
        </h1>
        <h1 class="text-base my-3">
            登录记录
        </h1>
        <p class="text-xs flex flex-col my-3">
            <span class="my-1">上次登录 IP：{{ userStore.user.value?.lastLoginIp ?? 'N/A' }}</span>
            <span class="my-1">
                上次登录时间：{{ userStore.user.value?.lastLoginTime ?
                    parseDate(userStore.user.value?.lastLoginTime, 'yyyy 年 M 月 d 日 HH:mm:ss',)
                    : 'N/A' }}
            </span>
        </p>
        <h1 class="text-base my-3">
            数据统计
        </h1>
        <p class="text-xs flex flex-col my-3">
            <span class="my-1">数据更新于：{{ statTime
                ? parseDate(statTime, 'yyyy 年 M 月 d 日 HH:mm:ss')
                : 'N/A' }}</span>
        </p>
    </div>
</template>

<style scoped>
</style>
