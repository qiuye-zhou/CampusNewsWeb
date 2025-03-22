<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { NTable, NButton, useMessage, NModal, NSelect, FormInst, FormRules, NForm, NFormItem } from 'naive-ui'

import { parseDate } from '~/utils/time'
import { examineNew, getAllAdminPendingPass } from './http'

const message = useMessage()

const ListData = reactive({
    list: [] as any[],
    examineData: {} as any,
    options: [
        {
          label: '审核通过',
          value: '审核通过',
        },
        {
          label: '审核不通过',
          value: '审核不通过'
        },
    ]
})
const ShowModal = ref(false)
const formRef = ref<FormInst | null>(null)
const modelRef = ref({
      state: '',
})

function handlexamine(data: any) {
    ShowModal.value = true
    ListData.examineData = data
}

async function updateListData() {
    try {
        const [response1] = await Promise.all([
        getAllAdminPendingPass()
        ]);
        ListData.list = await response1.data
    } catch (error) {
        console.error('One of the requests failed:', error)
    }
}
function handleExamineCancel() {
    ShowModal.value = false
    ListData.examineData = {}

}
function handleExamineConfirm(e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
          if (!errors) {
            ShowModal.value = false
            examineNew({ 
                id: ListData.examineData._id, 
                state: modelRef.value.state, 
            }).then((_res) => {
                message.success('审核成功')
                updateListData()
                ListData.examineData = {}
            })
          }
          else {
            message.error('请按要求填写内容')
          }
    })
}

onMounted(() => {
    updateListData()
})
const rules: FormRules = {
    state: [
      {
        required: true,
        message: '请选择审核结果'
      }
    ],
}
</script>

<template>
    <div>
        <n-table :size="'large'">
            <thead>
                <tr class="text-center">
                    <th>新闻名</th>
                    <th>作者</th>
                    <th>类别</th>
                    <th>描述</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="ListData.list.length > 0" v-for="item in ListData.list">
                    <td>{{ item.title.length }}</td>
                    <td>{{ item.editname }}</td>
                    <td>{{ item.typename }}</td>
                    <td>{{ item.detail ?? '暂无描述' }}</td>
                    <td>{{ parseDate(item.created) }}</td>
                    <td>{{ item.state }}</td>
                    <td>
                        <n-button  strong secondary round type="info" @click="handlexamine(item)">审核</n-button>
                    </td>
                </tr>
                <h1 v-else class="text-center text-red-400">暂无</h1>
            </tbody>
        </n-table>
        <n-modal v-model:show="ShowModal" preset="dialog" title="Dialog">
            <template #header>
                <div>审核新闻</div>
            </template>
            <div class="min-h-screen flex items-center flex-col">
                <h1 class="mt-10 text-2xl">{{ ListData.examineData.title }}</h1>
                <p class="text-xs my-2">{{ parseDate(ListData.examineData.created, 'yyyy 年 M 月 d 日 HH:mm:ss') }}</p>
                <p class="text-xs my-2">作者：{{ ListData.examineData.editname }}</p>
                <p class="text-xs my-2">浏览次数：{{ ListData.examineData.browsenum }}</p>
                <p class="text-lg my-2">{{ ListData.examineData.detail ?? '暂无介绍' }}</p>
                <pre class="p-12 whitespace-pre-wrap break-words">{{ ListData.examineData.text }}</pre>
            </div>
            <n-form ref="formRef" :model="modelRef" :rules="rules" autocomplete="off">
                <n-form-item  path="state" label="状态">
                    <n-select v-model:value="modelRef.state" :options="ListData.options" />
                </n-form-item>
            </n-form>
            <template #action>
                <n-button :type="'warning'" @click="handleExamineCancel">取消</n-button>
                <n-button :type="'success'" @click="handleExamineConfirm">确认</n-button>
            </template>
        </n-modal>
    </div>
</template>
