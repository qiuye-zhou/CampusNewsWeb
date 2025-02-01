<script setup lang="ts">
import {
    NForm, NFormItem, NInput, NSpace, NButton, NDynamicTags
} from 'naive-ui'
import {
    PropType,
    inject, reactive, ref
} from 'vue'
import { configtype } from '../type'
const properties = defineProps({
    onNext: {
        type: Function as PropType<() => void>,
        required: true
    }
})
const useDefaultConfigs = () => inject<configtype>('configs')
const defaultConfigs = useDefaultConfigs()

const title = ref(defaultConfigs?.seo?.title || '')
const keywords = ref(defaultConfigs?.seo?.keywords as string[])
const description = ref(defaultConfigs?.seo?.description || '')
const url = reactive({
    webUrl: location.origin,
    adminUrl: `${location.origin}/admin`,
    serverUrl: `${location.origin}/api`,
    gatewayUrl: `${location.origin}/web`
})

const handleNext = async () => {
    properties.onNext()
}
</script>

<template>
    <NForm size="small">
        <NFormItem
            label="站点标题"
            required
        >
            <NInput
                :value="title"
                @update-value="(e: any) => void (title = e)"
            />
        </NFormItem>
        <NFormItem
            label="站点描述"
            required
        >
            <NInput
                :value="description"
                @update-value="(e: any) => void (description = e)"
            />
        </NFormItem>
        <NFormItem label="关键字">
            <NDynamicTags
                :value="keywords"
                @update-value="(e: string[]) => void (keywords = e)"
            />
        </NFormItem>
        <NFormItem label="前端地址">
            <NInput
                :value="url.webUrl"
                @input="(e) => void (url.webUrl = e)"
            />
        </NFormItem>
        <NFormItem label="后台地址">
            <NInput
                :value="url.adminUrl"
                @input="(e) => void (url.adminUrl = e)"
            />
        </NFormItem>
        <NFormItem label="API 地址">
            <NInput
                :value="url.serverUrl"
                @input="(e) => void (url.serverUrl = e)"
            />
        </NFormItem>
        <NFormItem label="Gateway 地址">
            <NInput
                :value="url.gatewayUrl"
                @input="(e) => void (url.gatewayUrl = e)"
            />
        </NFormItem>
        <NSpace justify="end">
            <NButton
                size="small"
                round
                type="primary"
                :disabled="!title || !description"
                @click="handleNext"
            >
                下一步
            </NButton>
        </NSpace>
    </NForm>
</template>
