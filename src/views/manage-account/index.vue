<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import {
    NTabPane,
    NTabs,
    NTable,
    NButton,
    NModal,
    NForm,
    NFormItem,
    NInput,
    useMessage,
    useDialog
} from 'naive-ui'

import { RouteName } from '~/router/name'
import { getAllAdmin, getAllEdit, getRegister, deleteAccount } from './http'
import { parseDate } from '~/utils/time'
import { ModelType } from './type'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()

const accountDataLit = reactive({
    adminList: [] as any[],
    editList: [] as any[]
})
const createData = reactive({
    title: '',
    grade: true
})
const formRef = ref<FormInst | null>(null)
const modelRef = ref<ModelType>({
      username: '',
      name: '默认名称',
      password: '',
      reenteredPassword: null
})
const showModal = ref(false)

const tabValue = ref(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (route.query.state as any)
)

function cleanup() {
    modelRef.value.username = ''
    modelRef.value.name = '默认名称'
    modelRef.value.password = ''
    modelRef.value.reenteredPassword = ''
}
function handleCreate(grade: boolean) {
    showModal.value = true
    createData.title = `创建${grade? '管理员' : '编辑'}账户`
    createData.grade = grade
}
function handleCreateCancel() {
    showModal.value = false
    cleanup()
}
function handleCreateConfirm(e: { preventDefault: () => void }) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
          if (!errors) {
            showModal.value = false
            getRegister({ 
                username: modelRef.value.username, 
                name: modelRef.value.name, 
                password: modelRef.value.password, 
                grade: createData.grade.toString()
            }).then((_res) => {
                message.success('创建成功')
                updateListData()
                cleanup()
            })
          }
          else {
            message.error('请按要求填写内容')
          }
    })
}
async function updateListData() {
    try {
        const [response1, response2] = await Promise.all([
            getAllAdmin(),
            getAllEdit()
        ]);
        accountDataLit.adminList = await response1.data
        accountDataLit.editList = await response2.data
    } catch (error) {
        console.error('One of the requests failed:', error)
    }
}

function validatePasswordStartWith(
      _rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password
        && modelRef.value.password.startsWith(value)
        && modelRef.value.password.length >= value.length
      )
}
function validatePasswordSame(_rule: FormItemRule, value: string): boolean {
    return value === modelRef.value.password
}
function handleAccountDelete(id: string, username: string) {
    dialog.error({
          title: '删除账户',
          content: `是否确认删除账户${username}`,
          positiveText: '确认',
          onPositiveClick: () => {
            deleteAccount(id).then(_res => {
                message.success(`删除账户${username}成功`)
                updateListData()
            }).catch(_err => {
                message.success(`删除账户${username}失败`)
            })
          }
    })
}

const rules: FormRules = {
    username: [
      {
        required: true,
        message: '请输入账户'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码'
      }
    ],
    reenteredPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: ['input', 'blur']
      },
      {
        validator: validatePasswordStartWith,
        message: '两次密码输入不一致',
        trigger: 'input'
      },
      {
        validator: validatePasswordSame,
        message: '两次密码输入不一致',
        trigger: ['blur', 'password-input']
      }
    ]
}

onMounted(() => {
    updateListData()
})
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
                :name="'admin'"
                tab="管理员"
            >
                <n-table :size="'large'">
                    <thead>
                        <tr class="text-center">
                            <th>账户</th>
                            <th>名称</th>
                            <th>最后登入IP</th>
                            <th>最后登入时间</th>
                            <th>操作</th>
                            <th class="flex"><n-button  strong secondary type="success" @click="handleCreate(true)">新建</n-button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="accountDataLit.adminList.length > 0" v-for="item in accountDataLit.adminList">
                            <td>{{ item.username }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.lastLoginIp }}</td>
                            <td>{{ parseDate(item.lastLoginTime) }}</td>
                            <td>
                                <n-button  strong secondary round type="error" @click="handleAccountDelete(item._id, item.username)">删除</n-button>
                            </td>
                        </tr>
                        <h1 v-else class="text-center text-red-400">暂无</h1>
                    </tbody>
                </n-table>
            </NTabPane>
            <NTabPane
                :name="'edit'"
                tab="发布人员"
            >
                <n-table :size="'large'">
                    <thead>
                        <tr class="text-center">
                            <th>账户</th>
                            <th>名称</th>
                            <th>最后登入IP</th>
                            <th>最后登入时间</th>
                            <th>操作</th>
                            <th class="flex"><n-button  strong secondary type="success" @click="handleCreate(false)">新建</n-button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="accountDataLit.editList.length > 0" v-for="item in accountDataLit.editList">
                            <td>{{ item.username }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.lastLoginIp }}</td>
                            <td>{{ parseDate(item.lastLoginTime) }}</td>
                            <td>
                                <n-button  strong secondary round type="error" @click="handleAccountDelete(item._id, item.username)">删除</n-button>
                            </td>
                        </tr>
                        <h1 v-else class="text-center text-red-400">暂无</h1>
                    </tbody>
                </n-table>
            </NTabPane>
        </NTabs>
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>{{ createData.title }}</div>
            </template>
            <n-form ref="formRef" :model="modelRef" :rules="rules" autocomplete="off">
                <n-form-item path="username" label="账户">
                    <n-input v-model:value="modelRef.username" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="name" label="名称">
                    <n-input v-model:value="modelRef.name" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="modelRef.password" type="password" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item
                    ref="rPasswordFormItemRef"
                    first
                    path="reenteredPassword"
                    label="重复密码"
                >
                    <n-input
                        v-model:value="modelRef.reenteredPassword"
                        :disabled="!modelRef.password"
                        type="password"
                        @keydown.enter.prevent
                    />
                </n-form-item>
            </n-form>
            <template #action>
                <n-button :type="'warning'" @click="handleCreateCancel">取消</n-button>
                <n-button :type="'success'" @click="handleCreateConfirm">创建</n-button>
            </template>
        </n-modal>
    </div>
</template>
