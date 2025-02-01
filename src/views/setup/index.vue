<script setup lang="ts">
import { NCard, NSteps, NStep } from 'naive-ui'
import {
    onMounted, provide, reactive, ref
} from 'vue'

import { step1, step2, step3 } from './steps/index'
import { configtype } from './type'

const step = ref(0)
const defaultConfigs = reactive<configtype>({})
provide('configs', defaultConfigs)

onMounted(async () => {
    const configs = await Promise
    Object.assign(defaultConfigs, configs)
})
</script>

<template>
    <div
        class="overflow-auto w-full relative h-[100vh]
        flex items-center justify-center"
    >
        <NCard
            title="初始化"
            class="max-w-[80vw] m-auto"
        >
            <NSteps
                size="small"
                :current="step"
            >
                <NStep
                    :status="step > 0 ? 'finish' : 'process'"
                    title="站点设置"
                    description="先设置一下站点相关配置吧"
                />
                <NStep
                    :status="step > 1 ? 'finish' : step < 1 ? 'wait' : 'process'"
                    title="主人信息"
                    description="请告诉你的名字"
                />
                <NStep
                    :status="step > 2 ? 'finish' : step < 2 ? 'wait' : 'process'"
                    title="(･ω<)و✧"
                    description="一切就绪了"
                />
            </NSteps>
            <div>
                <step1
                    v-if="step == 0"
                    :on-next="() => step++"
                />
                <step2
                    v-if="step == 1"
                    :on-next="() => step++"
                />
                <step3
                    v-if="step == 2"
                />
            </div>
        </NCard>
    </div>
</template>
