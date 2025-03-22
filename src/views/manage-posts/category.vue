<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { NTable, NButton, FormInst, NModal, NForm, NFormItem, NInput, useMessage, useDialog } from 'naive-ui'

import { parseDate } from '~/utils/time'
import { getAllCategory, addCategory, deleteCategory } from './http'
import { ModelTypeCategory } from './type'

const message = useMessage()
const dialog = useDialog()

const categoryData = reactive({
    list: [] as any[]
})
const showModal = ref(false)
const formRef = ref<FormInst | null>(null)
const modelRef = ref<ModelTypeCategory>({
      name: '默认名称',
      description: '',
})

function cleanup() {
    modelRef.value.name = '默认名称'
    modelRef.value.description = ''
}
function handleCreate() {
    showModal.value = true
}
function handleCreateCancel() {
    showModal.value = false
    cleanup()
}
function handleCreateConfirm() {
    addCategory({
        name: modelRef.value.name,
        description: modelRef.value.description
    }).then((_res) => {
        handleCreateCancel()
        updateListData()
        message.success('创建成功')
    }).catch(err => {
        message.error(`创建类别${modelRef.value.name}失败：${err.response.data.message}`)
    })
}
function handleCategoryDelete(id: string, name: string) {
    dialog.error({
          title: '删除类别',
          content: `是否确认删除类别${name}`,
          positiveText: '确认',
          onPositiveClick: () => {
            deleteCategory(id).then(_res => {
                message.success(`删除类别${name}成功`)
                updateListData()
            }).catch(err => {
                message.error(`删除类别${name}失败：${err.response.data.message}`)
            })
          }
    })
}

async function updateListData() {
    try {
        const [response1] = await Promise.all([
            getAllCategory(),
        ]);
        categoryData.list = await response1.data
    } catch (error) {
        console.error('One of the requests failed:', error)
    }
}

onMounted(() => {
    updateListData()
})
</script>

<template>
    <div>
        <n-table :size="'large'">
            <thead>
                <tr class="text-center">
                    <th>类型名</th>
                    <th>描述</th>
                    <th>创建时间</th>
                    <th>操作</th>
                    <th class="flex"><n-button  strong secondary type="success" @click="handleCreate">新建</n-button></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="categoryData.list.length > 0" v-for="item in categoryData.list">
                    <td>{{ item.name }}</td>
                    <td class="text-wrap max-w-72">{{ item.description ?? '暂无描述' }}</td>
                    <td>{{ parseDate(item.created) }}</td>
                    <td>
                        <n-button  strong secondary round type="error" @click="handleCategoryDelete(item._id, item.name)">删除</n-button>
                    </td>
                </tr>
                <h1 v-else class="text-center text-red-400">暂无</h1>
            </tbody>
        </n-table>
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>新建类别</div>
            </template>
            <n-form ref="formRef" :model="modelRef" autocomplete="off">
                <n-form-item path="username" label="类别名">
                    <n-input v-model:value="modelRef.name" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="name" label="类别描述">
                    <n-input v-model:value="modelRef.description" @keydown.enter.prevent />
                </n-form-item>
            </n-form>
            <template #action>
                <n-button :type="'warning'" @click="handleCreateCancel">取消</n-button>
                <n-button :type="'success'" @click="handleCreateConfirm">创建</n-button>
            </template>
        </n-modal>
    </div>
</template>
