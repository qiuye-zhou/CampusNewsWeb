<script setup lang="ts">
import {
    NP,
    NSpace,
    NTabPane,
    NTabs
} from 'naive-ui'
import Graph from './Graph.vue'
import AnalyzeTitle from './components/AnalyzeTitle.vue'
</script>

<template>
    <div>
        <Graph />
        <NTabs>
            <NTabPane name="IP 记录">
                <NP>
                    <AnalyzeTitle :title="`今天 - 所有请求的 IP ${1} 个`" />
                    <div>
                        <NSpace>
                            <p>待写</p>
                            <p>待写</p>
                            <p>待写</p>
                        </NSpace>
                    </div>
                </NP>
            </NTabPane>
            <NTabPane name="访问路径">
                <AnalyzeTitle :title="'访问路径'" />
                <p>待写</p>
            </NTabPane>
        </NTabs>
    </div>
</template>
