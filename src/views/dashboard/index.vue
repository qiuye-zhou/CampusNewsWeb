<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { parseDate } from '~/utils/time'
import storage from '~/utils/localstorage'
import { UserDate } from '~/utils/token'
const DataList = reactive({
    lastLoginIp: '',
    lastLoginTime: '',
    name: '',
    grade: '',
    updateTime: new Date()
})

onMounted(() => {
    const userData = storage.get(UserDate)
    DataList.lastLoginIp = userData.lastLoginIp
    DataList.lastLoginTime = userData.lastLoginTime
    DataList.name = userData.name
    DataList.grade = userData.grade ? '管理员' : '编辑'
    DataList.updateTime = new Date()
})
</script>

<template>
    <div>
        <h1 class="text-2xl font-light my-9">
            欢迎回来{{ DataList.grade }}{{ DataList.name }}
        </h1>
        <h1 class="text-base my-3">
            登录记录
        </h1>
        <p class="text-xs flex flex-col my-3">
            <span class="my-1">上次登录 IP：{{ DataList.lastLoginIp ?? 'N/A' }}</span>
            <span class="my-1">
                上次登录时间：{{ DataList.lastLoginTime ?
                    parseDate(DataList.lastLoginTime, 'yyyy 年 M 月 d 日 HH:mm:ss',)
                    : 'N/A' }}
            </span>
        </p>
        <h1 class="text-base my-3">
            数据统计
        </h1>
        <p class="text-xs flex flex-col my-3">
            <span class="my-1">数据更新于：{{ DataList.updateTime
                ? parseDate(DataList.updateTime, 'yyyy 年 M 月 d 日 HH:mm:ss')
                : 'N/A' }}</span>
        </p>
    </div>
</template>

<style scoped>
</style>
