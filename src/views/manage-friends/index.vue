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
                tab="朋友们"
            />
            <NTabPane
                :name="LinkState.Audit"
                tab="待审核"
            />
            <NTabPane
                :name="LinkState.Outdate"
                tab="过时的"
            />
            <NTabPane
                :name="LinkState.Reject"
                tab="已拒绝"
            />
            <NTabPane
                :name="LinkState.Banned"
                tab="封禁的"
            />
        </NTabs>
    </div>
</template>
