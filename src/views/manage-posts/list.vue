<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { NTable, NButton, useMessage, useDialog } from 'naive-ui'

import { parseDate } from '~/utils/time'
import { deleteNew, getAllPass } from './http'

const message = useMessage()
const dialog = useDialog()

const ListData = reactive({
    list: [] as any[]
})

function handleCategoryDelete(id: string, name: string) {
    dialog.error({
          title: '删除新闻',
          content: `是否确认删除新闻${name}`,
          positiveText: '确认',
          onPositiveClick: () => {
            deleteNew(id).then(_res => {
                message.success(`删除新闻${name}成功`)
                updateListData()
            }).catch(err => {
                message.error(`删除新闻${name}失败：${err.response.data.message}`)
            })
          }
    })
}

async function updateListData() {
    try {
        const [response1] = await Promise.all([
            getAllPass()
        ]);
        ListData.list = await response1.data
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
                    <th>新闻名</th>
                    <th>作者</th>
                    <th>类别</th>
                    <th>描述</th>
                    <th>创建时间</th>
                    <th>浏览人数</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="ListData.list.length > 0" v-for="item in ListData.list">
                    <td>{{ item.title }}</td>
                    <td>{{ item.editname }}</td>
                    <td>{{ item.typename }}</td>
                    <td>{{ item.detail ?? '暂无描述' }}</td>
                    <td>{{ parseDate(item.created) }}</td>
                    <td>{{ item.browsenum }}</td>
                    <td>
                        <n-button  strong secondary round type="error" @click="handleCategoryDelete(item._id, item.title)">删除</n-button>
                    </td>
                </tr>
                <h1 v-else class="text-center text-red-400">暂无</h1>
            </tbody>
        </n-table>
    </div>
</template>
