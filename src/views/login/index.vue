<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, NSpin } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import Avatar from '~/components/avatar/index.vue'
import { avatarUrl } from '~/constants/env'
import { login } from './http'
import storage from '~/utils/localstorage'
import { Role, TokenKey, UserDate } from '~/utils/token'
import { RouteName } from '~/router/name'
import { routeForMenuAdmin, routeForMenuEdit } from '~/router'
import SidebarLayout from '../../layout/sidebar/index.vue'

const Message = useMessage()
const account = ref('')
const password = ref('')
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const spinState = ref(true)

const router = useRouter()

const handleLogin = async (event: Event) => {
    event?.stopPropagation()

    if (!account.value) {
        Message.error('请输入帐号')
    } else {
        if (!password.value) {
            Message.error('请输入密码')
        } else {
            spinState.value = false
            login({
                username: account.value,
                password: password.value
            }).then(res => {
                storage.set(TokenKey, res.data.token)
                storage.set(Role, res.data.grade ? 'admin' : 'edit')
                storage.set(UserDate, res.data)
                const routeForMenu = storage.get("role") == 'admin' ? routeForMenuAdmin : routeForMenuEdit
                router.addRoute({
                    path: '/',
                    component: SidebarLayout,
                    name: RouteName.Home,
                    redirect: '/dashboard',
                    children: [...routeForMenu]
                })
                router.push({path: '/dashboard',})
                spinState.value = true
            }).catch(err => {
                Message.error(err.response.data.message)
                spinState.value = true
            })
        }
    }
}
</script>

<template>
    <div
        class="absolute flex justify-center flex-col items-center
        top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-12 rounded-md"
    >
        <Avatar
            :src="user?.avatar || avatarUrl"
            :size="80"
        />
        <form
            class="flex flex-col items-center justify-center"
            action="#"
            @submit.prevent="handleLogin"
        >
            <div class="relative overflow-hidden text-xl">
                <span>校园新闻管理平台</span>
            </div>
            <div class="relative overflow-hidden">
                <span>帐号</span>
                <input
                    ref="input"
                    v-model="account"
                    class="relative py-1 m-2 px-3 leading-4 backdrop-blur-xl
                    bg-white bg-opacity-20 rounded-3xl tracking-wider outline-none"
                    type="text"
                    autocomplete=" "
                    autofocus
                >
            </div>
            <div class="relative overflow-hidden">
                <span>密码</span>
                <input
                    ref="input"
                    v-model="password"
                    class="relative py-1 px-3 m-2 leading-4 backdrop-blur-xl
                    bg-white bg-opacity-20 rounded-3xl tracking-wider outline-none"
                    type="password"
                    autocomplete=" "
                    autofocus
                >
            </div>
            <button
                v-if="spinState"
                :data-title="'登入'"
                class="relative inline-block text-xs font-semibold rounded px-4 py-1 mt-4
                text-slate-50 bg-gradient-to-br from-sky-500 to-sky-300
                active:shadow-[0_0_0_3px_rgba(14,165,233,0.5)]
                transition-all
                cursor-pointer select-none text-center"
                @click.prevent.stop="handleLogin"
            >
                登入
            </button>
            <n-spin v-else size="small" />
        </form>
    </div>
</template>
