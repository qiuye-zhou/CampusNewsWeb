<!-- eslint-disable no-unused-expressions -->
<script setup lang="ts">
import {
    NCard,
    NForm,
    NButton,
    NSelect,
    NFormItem,
    NSwitch
} from 'naive-ui'
import { reactive } from 'vue'

const storeApiUrlKey = 'admin:setup-api:url'
const storeGatewayUrlKey = 'admin:setup-api:gateway'
const transformUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url

    const protocol = ['localhost', '127.0.0.1'].includes(url) ? 'http' : 'https'
    return `${protocol}://${url}`
}

const apiRecord = reactive({
    apiUrl: localStorage.getItem('__api') || '',
    gatewayUrl: localStorage.getItem('__gateway') || '',
    persist: false
})

const historyApiUrl: string[] = JSON.parse(localStorage.getItem(storeApiUrlKey) || '[]')
const historyGatewayUrl: string[] = JSON.parse(localStorage.getItem(storeGatewayUrlKey) || '[]')

const handleLocalDevelopment = () => {
    apiRecord.apiUrl = 'http://localhost:3000'
    apiRecord.gatewayUrl = 'http://localhost:3000'
}

const handleReset = () => {
    localStorage.removeItem('__api')
    localStorage.removeItem('__gateway')
    location.href = '/setup-api'
}

const handSubmit = () => {
    const { apiUrl, gatewayUrl, persist } = apiRecord

    if (!apiUrl || !gatewayUrl) return

    const fullApiUrl = transformUrl(apiUrl)
    const fullGatewayUrl = transformUrl(gatewayUrl)

    if (persist) {
        fullApiUrl && localStorage.setItem('__api', fullApiUrl)
        fullGatewayUrl && localStorage.setItem('__gateway', fullGatewayUrl)
    }

    localStorage.setItem(
        storeApiUrlKey,
        JSON.stringify([...new Set([...historyApiUrl, apiUrl])])
    )
    localStorage.setItem(
        storeGatewayUrlKey,
        JSON.stringify([...new Set([...historyGatewayUrl, gatewayUrl])])
    )
    location.href = '/'
}
</script>

<template>
    <div class="relative flex h-screen w-full items-center justify-center">
        <NCard
            title="设置 API"
            class="m-5 max-w-xl"
        >
            <NForm @submit="handSubmit">
                <NFormItem label="API 地址">
                    <NSelect
                        filterable
                        clearable
                        tag
                        :value="apiRecord.apiUrl"
                        :options="historyApiUrl.map((url) => ({
                            key: url,
                            value: url,
                            label: url,
                        }))"
                        :on-update-value="(val) => {
                            apiRecord.apiUrl = val
                        }"
                    />
                </NFormItem>
                <NFormItem label="Gateway 地址">
                    <NSelect
                        filterable
                        clearable
                        tag
                        :value="apiRecord.gatewayUrl"
                        :options="historyGatewayUrl.map((url) => ({
                            key: url,
                            value: url,
                            label: url,
                        }))"
                        :on-update-value="(val) => {
                            apiRecord.gatewayUrl = val
                        }"
                    />
                </NFormItem>
                <NFormItem
                    label="持久化"
                    label-placement="left"
                >
                    <NSwitch
                        :value="apiRecord.persist"
                        :on-update-value="(v) => {
                            apiRecord.persist = v
                        }"
                    />
                </NFormItem>
                <div class="space-x-2 text-center">
                    <NButton
                        round
                        @click="handleLocalDevelopment"
                    >
                        本地调试
                    </NButton>
                    <NButton
                        round
                        @click="handleReset"
                    >
                        重置
                    </NButton>
                    <NButton
                        round
                        type="primary"
                        @click="handSubmit"
                    >
                        确定
                    </NButton>
                </div>
            </NForm>
        </NCard>
    </div>
</template>

<style scoped>
</style>
