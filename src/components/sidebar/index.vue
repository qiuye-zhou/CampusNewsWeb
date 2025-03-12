<script setup lang="ts">
import {
    PropType, computed, onMounted, ref
} from 'vue'
import { NLayoutContent } from 'naive-ui'
import { useStoreRef as useStoreReference } from '~/hooks/useStoreRef'
import { UIStore } from '~/stores/ui'
import { configs } from '~/constants/env'

import { Dark, Light, SidebarCloseIcon } from '../icons/index'
import { useRouter } from 'vue-router'
import { MenuModel, buildMenus } from '~/utils/menu'
import MenuItem from './menu.vue'
import Exit from '../icons/list/Exit.vue'
import LoginOut from '../icons/list/LoginOut.vue'
import { RouteName } from '~/router/name'
import storage from '~/utils/localstorage'
import { Role, TokenKey, UserDate } from '~/utils/token'

const properties = defineProps({
    collapse: {
        type: Boolean,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    sidebarWidthCollapse: {
        type: Number,
        required: true
    },
    collapseChange: {
        // eslint-disable-next-line no-unused-vars
        type: Function as PropType<{ (s: boolean): void }>,
        required: true
    }
})

const title = configs.title
const menus = ref<MenuModel[]>([])

const { isDark, toggleDark } = useStoreReference(UIStore)
const router = useRouter()
const route = computed(() => router.currentRoute.value)

onMounted(() => {
    menus.value = buildMenus(router.getRoutes())
})

const indexReference = ref(0)

function updateIndex(nextIndex: number) {
    indexReference.value = nextIndex
}

function handleRoute(item: MenuModel, nextIndex?: number) {
    router.push({
        path: item.fullPath,
        query: item.query
    })
    if (typeof nextIndex === 'number') {
        updateIndex(nextIndex)
    }
}

function handleloginout() {
    router.removeRoute(RouteName.Home)
    storage.remove(TokenKey)
    storage.remove(Role)
    storage.remove(UserDate)
    router.push({path: '/login'})
}

</script>

<template>
    <div
        class="flex flex-col fixed h-full z-10 left-0 top-0 overflow-hidden transition-all
        text-white bg-emerald-600 dark:bg-emerald-700"
        :style="{
            width: !properties.collapse && properties.width ?
                `${properties.width}px` : `${properties.sidebarWidthCollapse}px`,}"
    >
        <div
            class="flex justify-around items-center
                relative h-20 flex-shrink-0 text-center text-sm font-medium"
        >
            <button
                @click="() => void toggleDark()"
            >
                <light v-if="!isDark" />
                <dark v-else />
            </button>
            <h1
                :class="`py-6 transition-all truncate overflow-clip
                ${properties.collapse ? 'hidden' : ''}`"
            >
                {{ title }}
            </h1>
            <button
                @click="() => {
                    properties.collapseChange(!properties.collapse)
                }"
            >
                <SidebarCloseIcon :collapse="properties.collapse" />
            </button>
        </div>
        <NLayoutContent
            class="flex-grow p-0 menu"
            :native-scrollbar="false"
        >
            <div class="pl-4">
                <div
                    v-for="(item, index) in menus"
                    :key="item.fullPath"
                    :class="[
                        route.fullPath === item.fullPath ||
                            route.fullPath.startsWith(item.fullPath)
                            ? 'active'
                            : ''
                    ]"
                >
                    <MenuItem
                        :class-names="'py-3'"
                        :title="item.title"
                        :collapse="properties.collapse"
                        @click="() => {
                            handleRoute(item, index)
                        }"
                    >
                        <component :is="item.icon" />
                    </MenuItem>
                    <ul
                        :class="`${item.subItems && indexReference === index ?
                            '' : 'hidden'}`"
                    >
                        <li
                            v-for="child in item.subItems"
                            :key="child.path"
                        >
                            <MenuItem
                                :class-names="'py-3 pl-3'"
                                :title="child.title"
                                :collapse="properties.collapse"
                                @click="handleRoute(child)"
                            >
                                <component :is="child.icon" />
                            </MenuItem>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        :class="`flex w-full text-sm items-center py-3
                      hover:!text-white hover:!bg-transparent focus:!text-white focus:!bg-transparent`"
                        @click="() => {router.push({path: '/webhome',})}"
                    >
                    <span class="flex basis-12 items-center justify-center">
                        <Exit />
                    </span>
                        <span :class="`${properties.collapse ? 'hidden' : ''}`">新闻入口</span>
                    </button>
                </div>
                <div>
                    <button
                        :class="`flex w-full text-sm items-center py-3
                      hover:!text-white hover:!bg-transparent focus:!text-white focus:!bg-transparent`"
                        @click="handleloginout"
                    >
                    <span class="flex basis-12 items-center justify-center">
                        <LoginOut />
                    </span>
                        <span :class="`${properties.collapse ? 'hidden' : ''}`">退出登录</span>
                    </button>
                </div>
            </div>
        </NLayoutContent>
    </div>
</template>
<style scoped>
.active {
    background: #4cab8c;
    border-radius: 18px 0 0 18px;
}
:is([data-theme="dark"] .active) {
    background-color: rgb(55, 131, 105);
}
.menu {
    background-color: transparent;
    color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>
