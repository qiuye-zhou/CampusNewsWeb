import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserModel } from '../models/user'
import { router } from '../router'

export const useUserStore = defineStore('user', () => {
    const user = ref<UserModel | null>(null)
    const fetchUser = async () => {
        try {
            const $user = await new Promise<UserModel | null>(pe => { pe(null) })
            user.value = $user
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data?.message === '没有完成初始化！') {
                router.replace('/setup')
            }
        }
    }
    return {
        user,

        fetchUser
    }
})
