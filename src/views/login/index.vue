<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import Avatar from '~/components/avatar/index.vue'
import { avatarUrl } from '~/constants/env'

const Message = useMessage()
const password = ref('')
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const handleLogin = async (event: Event) => {
    event?.stopPropagation()

    if (!password.value) {
        Message.error('请输入密码')
    }
    console.log('handleLogin', password.value)
}
</script>

<template>
    <div
        class="absolute flex justify-center flex-col items-center
        top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
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
            <div class="relative overflow-hidden">
                <input
                    ref="input"
                    v-model="password"
                    class="relative py-1 px-3 leading-4 backdrop-blur-xl text-slate-100
                    bg-white bg-opacity-20 rounded-3xl tracking-wider outline-none"
                    type="password"
                    autocomplete=" "
                    autofocus
                >
            </div>
            <button
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
        </form>
    </div>
</template>
