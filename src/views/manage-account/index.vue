<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
    NTabPane,
    NTabs
} from 'naive-ui'

import { LinkState } from '~/models/link'
import { RouteName } from '~/router/name'

const route = useRoute()
const router = useRouter()

const tabValue = ref<LinkState>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (route.query.state as any) ?? LinkState.Pass
)
</script>

<template>
    <div>
        <NTabs
            class="min-h-[30px]"
            size="medium"
            :value="tabValue"
            @update-value="(e) => {
                tabValue = e

                router.replace({ name: RouteName.Friend, query: { state: e } })
            }"
        >
            <NTabPane
                :name="LinkState.Pass"
                tab="管理员"
            />
            <NTabPane
                :name="LinkState.Audit"
                tab="发布人员"
            />
        </NTabs>
    </div>
</template>
