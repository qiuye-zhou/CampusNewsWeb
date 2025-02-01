<script setup lang="ts">
import { PropType, reactive, ref } from 'vue'
import {
    useMessage, NForm, NFormItem, NInput, NSpace, NButton
} from 'naive-ui'

import { UserModel } from '~/models/user'

const properties = defineProps({
    onNext: {
        type: Function as PropType<() => void>,
        required: true
    }
})

const user = reactive({} as UserModel)
const repassword = ref('')
const message = useMessage()

const handleNext = async () => {
    if (user.password !== repassword.value) {
        message.error('两次密码不一致')
        return
    }
    message.success('api待写')
    properties.onNext()
}
</script>

<template>
    <NForm size="small">
        <NFormItem
            label="你的名字 (登录凭证)"
            required
        >
            <NInput
                :value="user.username"
                @update-value="(e: string) => {
                    user.username = e
                }"
            />
        </NFormItem>
        <NFormItem label="昵称">
            <NInput
                :value="user.name"
                @update-value="(e) => {
                    user.name = e
                }"
            />
        </NFormItem>
        <NFormItem
            label="邮箱"
            required
        >
            <NInput
                :value="user.mail"
                @update-value="(e: string) => {
                    user.mail = e
                }"
            />
        </NFormItem>
        <NFormItem
            label="密码"
            required
        >
            <NInput
                :value="user.password"
                type="password"
                :input-props="{ autocomplete: 'off' }"
                @update-value="(e) => {
                    user.password = e
                }"
            />
        </NFormItem>

        <NFormItem
            label="确认密码"
            required
        >
            <NInput
                :value="repassword"
                type="password"
                :input-props="{ autocomplete: 'off' }"
                @update-value="(e) => {
                    repassword = e
                }"
            />
        </NFormItem>

        <NFormItem label="个人首页">
            <NInput
                :value="user.url"
                @update-value="(e) => {
                    user.url = e
                }"
            />
        </NFormItem>
        <NFormItem label="头像Url">
            <NInput
                :value="user.avatar"
                @update-value="(e) => {
                    user.avatar = e
                }"
            />
        </NFormItem>
        <NSpace justify="end">
            <NButton
                :disabled="!user.username ||
                    !user.mail ||
                    !user.password ||
                    !repassword"
                size="small"
                round
                type="primary"
                @click="handleNext"
            >
                下一步
            </NButton>
        </NSpace>
    </NForm>
</template>
