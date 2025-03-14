<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { updateInfo } from './http'
import storage from '~/utils/localstorage'
import { Role, TokenKey, UserDate } from '~/utils/token'
import { RouteName } from '~/router/name'

const router = useRouter()

const Message = useMessage()

const userFrom = reactive({
    name: '',
    password: ''
})

onMounted(() => {
    const user = storage.get(UserDate)
    userFrom.name = user.name
})

const handleUpdataName = async (event: Event) => {
    event?.stopPropagation()

    if (!userFrom.name) {
        Message.error('请输入名称')
    } else {
        console.log(userFrom.name,userFrom.password)
        updateInfo({
            name: userFrom.name,
        }).then(res => {
            console.log(res)
            router.removeRoute(RouteName.Home)
            storage.remove(TokenKey)
            storage.remove(Role)
            storage.remove(UserDate)
            router.push({path: '/login',})
        }).catch(err => {
            Message.error(err.response.data.message)
        })
    }
}
const handleUpdataPassword = async (event: Event) => {
    event?.stopPropagation()

    if (!userFrom.password) {
        Message.error('请输入密码')
    } else {
        updateInfo({
            password: userFrom.password,
        }).then(res => {
            console.log(res)
            router.removeRoute(RouteName.Home)
            storage.remove(TokenKey)
            storage.remove(Role)
            storage.remove(UserDate)
            router.push({path: '/login',})
        }).catch(err => {
            Message.error(err.response.data.message)
        })
    }
}
</script>

<template>
    <div class="flex justify-center flex-col items-center ml-12 rounded-md">
        <h1 class="my-8">修改名称</h1>
        <form
            class="flex flex-row items-center justify-center"
            action="#"
            @submit.prevent="handleUpdataName"
        >
            <div class="relative overflow-hidden">
                <span class="text-base">名称</span>
                <input
                    ref="input"
                    v-model="userFrom.name"
                    class="relative py-1 m-2 px-3 leading-4 backdrop-blur-xl
                    bg-slate-400  bg-opacity-20 rounded-3xl tracking-wider outline-none"
                    type="text"
                    autocomplete=" "
                >
            </div>
            <button
                :data-title="'修改'"
                class="relative inline-block font-semibold rounded px-4 py-1
                text-slate-50 bg-gradient-to-br from-sky-500 to-sky-300
                active:shadow-[0_0_0_3px_rgba(14,165,233,0.5)]
                transition-all
                cursor-pointer select-none text-center"
                @click.prevent.stop="handleUpdataName"
            >
                确认修改
            </button>
        </form>
        <h1 class="my-8">修改密码</h1>
        <form
            class="flex flex-row items-center justify-center"
            action="#"
            @submit.prevent="handleUpdataName"
        >
            <div class="relative overflow-hidden">
                <span class="text-base">密码</span>
                <input
                    ref="input"
                    v-model="userFrom.password"
                    class="relative py-1 m-2 px-3 leading-4 backdrop-blur-xl
                    bg-slate-400 bg-opacity-20 rounded-3xl tracking-wider outline-none"
                    type="text"
                    autocomplete=" "
                >
            </div>
            <button
                :data-title="'修改'"
                class="relative inline-block font-semibold rounded px-4 py-1
                text-slate-50 bg-gradient-to-br from-sky-500 to-sky-300
                active:shadow-[0_0_0_3px_rgba(14,165,233,0.5)]
                transition-all
                cursor-pointer select-none text-center"
                @click.prevent.stop="handleUpdataPassword"
            >
                确认修改
            </button>
        </form>
    </div>
</template>
