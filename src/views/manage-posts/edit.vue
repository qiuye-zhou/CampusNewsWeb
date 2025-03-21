<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInst, FormRules } from 'naive-ui'
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
    useDialog,
    NSelect
} from 'naive-ui'

import { getAllCategorySelect, getAllEditPass, getAllPendingPass, addNew, deleteNew, updateNew } from './http'
import { parseDate } from '~/utils/time'
import { NewModelType } from './type'

const route = useRoute()
const message = useMessage()
const dialog = useDialog()

const NewEditDataLit = reactive({
    passList: [] as any[],
    pendingList: [] as any[]
})
const createData = reactive({
    options: []
})
const formRef = ref<FormInst | null>(null)
const modelRef = ref<NewModelType>({
      title: '',
      typename: '默认名称',
      detail: '',
      text: ''
})
const showModal = ref(false)
const updateShowModal = ref(false)
const updateNewId = ref()

const tabValue = ref(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (route.query.state as any)
)

function cleanup() {
    modelRef.value.title = ''
    modelRef.value.typename = '默认名称'
    modelRef.value.detail = ''
    modelRef.value.text = ''
    modelRef.value.text = ''
}
function handleCreate() {
    showModal.value = true
}
function handleCreateCancel() {
    showModal.value = false
    cleanup()
}
function handleCreateConfirm(e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
          if (!errors) {
            showModal.value = false
            addNew({ 
                title: modelRef.value.title, 
                typename: modelRef.value.typename, 
                detail: modelRef.value.detail, 
                text: modelRef.value.text, 
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
            getAllEditPass(),
            getAllPendingPass(),
        ]);
        NewEditDataLit.passList = await response1.data
        NewEditDataLit.pendingList = await response2.data
    } catch (error) {
        console.error('One of the requests failed:', error)
    }
}

function handlePendingNewDelete(id: string, title: string) {
    dialog.error({
          title: '删除新闻',
          content: `是否确认删除新闻${title}`,
          positiveText: '确认',
          onPositiveClick: () => {
            deleteNew(id).then(_res => {
                message.success(`删除新闻${title}成功`)
                updateListData()
            }).catch(_err => {
                message.success(`删除新闻${title}失败`)
            })
          }
    })
}
function handlePendingNewUpdate(id: string, newData: NewModelType) {
    updateShowModal.value = true
    updateNewId.value = id
    console.log(id)
    modelRef.value.title = newData.title
    modelRef.value.typename = newData.typename
    modelRef.value.detail = newData.detail
    modelRef.value.text = newData.text
}
function handleUpdateCancel() {
    updateShowModal.value = false
    cleanup()
}
function handleUpdateConfirm(e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
          if (!errors) {
            updateShowModal.value = false
            updateNew(updateNewId.value, { 
                title: modelRef.value.title, 
                typename: modelRef.value.typename, 
                detail: modelRef.value.detail, 
                text: modelRef.value.text, 
            }).then((_res) => {
                message.success('更改成功')
                updateListData()
                cleanup()
            })
          }
          else {
            message.error('请按要求填写内容')
          }
    })
}

const rules: FormRules = {
    title: [
      {
        required: true,
        message: '请输入新闻名'
      }
    ],
}

onMounted(() => {
    getAllCategorySelect().then(res => {
        createData.options = res.data
    })
    updateListData()
})
</script>

<template>
    <div>
        <NTabs
            class="min-h-[30px]"
            size="medium"
            :value="tabValue"
        >
            <NTabPane
                :name="'admin'"
                tab="待审核"
            >
                <n-table :size="'large'">
                    <thead>
                        <tr class="text-center">
                            <th>新闻名</th>
                            <th>类别</th>
                            <th>描述</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>操作</th>
                            <th class="flex"><n-button  strong secondary type="success" @click="handleCreate()">新建</n-button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="NewEditDataLit.pendingList.length > 0" v-for="item in NewEditDataLit.pendingList">
                            <td>{{ item.title }}</td>
                            <td>{{ item.typename }}</td>
                            <td>{{ item.detail }}</td>
                            <td>{{ parseDate(item.created) }}</td>
                            <td>{{ item.state }}</td>
                            <td>
                                <n-button  strong secondary round type="error" @click="handlePendingNewDelete(item._id, item.title)">删除</n-button>
                                <n-button  strong secondary round type="info" @click="handlePendingNewUpdate(item._id, item)">更改</n-button>
                            </td>
                        </tr>
                        <h1 v-else class="text-center text-red-400">暂无</h1>
                    </tbody>
                </n-table>
            </NTabPane>
            <NTabPane
                :name="'edit'"
                tab="审核通过"
            >
                <n-table :size="'large'">
                    <thead>
                        <tr class="text-center">
                            <th>新闻名</th>
                            <th>类别</th>
                            <th>描述</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>浏览人数</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="NewEditDataLit.passList.length > 0" v-for="item in NewEditDataLit.passList">
                            <td>{{ item.title }}</td>
                            <td>{{ item.typename }}</td>
                            <td>{{ item.detail }}</td>
                            <td>{{ parseDate(item.created) }}</td>
                            <td>{{ item.state }}</td>
                            <td>{{ item.browsenum }}</td>
                            <td>
                                <n-button  strong secondary round type="error" @click="handlePendingNewDelete(item._id, item.title)">删除</n-button>
                            </td>
                        </tr>
                        <h1 v-else class="text-center text-red-400">暂无</h1>
                    </tbody>
                </n-table>
            </NTabPane>
        </NTabs>
        <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>创建新闻</div>
            </template>
            <n-form ref="formRef" :model="modelRef" :rules="rules" autocomplete="off">
                <n-form-item path="title" label="新闻名">
                    <n-input v-model:value="modelRef.title" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="typename" label="类别">
                    <n-select
                        v-model:value="modelRef.typename"
                        placeholder="Select"
                        :options="createData.options"
                        @keydown.enter.prevent
                    />
                </n-form-item>
                <n-form-item path="detail" label="描述">
                    <n-input v-model:value="modelRef.detail" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="text" label="新闻内容">
                    <n-input v-model:value="modelRef.text" type="textarea" placeholder="输入新闻内容" />
                </n-form-item>
            </n-form>
            <template #action>
                <n-button :type="'warning'" @click="handleCreateCancel">取消</n-button>
                <n-button :type="'success'" @click="handleCreateConfirm">创建</n-button>
            </template>
        </n-modal>
        <n-modal v-model:show="updateShowModal" preset="dialog" title="Dialog">
            <template #header>
                <div>更改新闻</div>
            </template>
            <n-form ref="formRef" :model="modelRef" :rules="rules" autocomplete="off">
                <n-form-item path="title" label="新闻名">
                    <n-input v-model:value="modelRef.title" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="typename" label="类别">
                    <n-select
                        v-model:value="modelRef.typename"
                        placeholder="Select"
                        :options="createData.options"
                        @keydown.enter.prevent
                    />
                </n-form-item>
                <n-form-item path="detail" label="描述">
                    <n-input v-model:value="modelRef.detail" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="text" label="新闻内容">
                    <n-input v-model:value="modelRef.text" type="textarea" placeholder="输入新闻内容" />
                </n-form-item>
            </n-form>
            <template #action>
                <n-button :type="'warning'" @click="handleUpdateCancel">取消</n-button>
                <n-button :type="'success'" @click="handleUpdateConfirm">更改</n-button>
            </template>
        </n-modal>
    </div>
</template>
