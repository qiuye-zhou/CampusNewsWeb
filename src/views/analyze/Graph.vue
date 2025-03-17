<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { extend, Runtime, corelib } from '@antv/g2'
import { onMounted, reactive, ref, watch } from 'vue'
import { useStoreRef as useStoreReference } from '~/hooks/useStoreRef'
import { UIStore } from '~/stores/ui'
import {
    Month, Path, Today, Week
} from './types'

import { getReqTop, getTimeday, getTimeHours, getTypetop } from './http'

import AnalyzeTitle from './components/AnalyzeTitle.vue'

const Chart = extend(Runtime, corelib())

const ui = useStoreReference(UIStore)
const isDark = ui.isDark

const dayChart = ref<HTMLDivElement>()
const weekChart = ref<HTMLDivElement>()
const monthChart = ref<HTMLDivElement>()
const pieChart = ref<HTMLDivElement>()
let chartlist: any[]

const graphDataList = reactive({
    topPaths: [] as Path[],
    topNewClass: [] as Path[],
    day: [] as Today[],
    week: [] as Week[]
})

const renderChart = (
    element: HTMLElement | undefined,
    _field: 'day' | 'week' | 'month',
    data: Today[] | Week[] | Month[],
    label: [string, string]
) => {
    if (!element) {
        return
    }
    const chart = new Chart({
        container: element,
        autoFit: true,
        height: 230,
        padding: 20
    })

    chart.data(data)
    chart
        .line()
        .encode('x', label[0])
        .encode('y', label[1])
        .style('stroke', '#30BF78')
        .style('lineWidth', 2)
    chart
        .point()
        .encode('x', label[0])
        .encode('y', label[1])
        .style('stroke', '#30BF78')
        .style('lineWidth', 2)

    chart.theme({ type: isDark.value ? 'dark' : 'light' })
    chart.render()
    return chart
}

const renderPie = (element: HTMLElement | undefined, datalist: Path[]) => {
    if (!element) {
        return
    }
    const pieData = datalist.slice(0, 10)
    const total = pieData.reduce((pre, { count }) => count + pre, 0)

    const data = pieData.map(paths => {
        return {
            item: decodeURI(paths.path),
            count: paths.count,
            percent: paths.count / total
        }
    })

    const chart = new Chart({
        container: element,
        autoFit: true,
        height: 230,
        padding: 20
    })

    chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 })

    chart
        .interval()
        .data(data)
        .transform({ type: 'stackY' })
        .encode('y', 'count')
        .encode('color', 'item')
        .label({
            text: (d: { item: any; percent: number; }) => {
                return `${d.item}: ${(d.percent * 100).toFixed(2)}%`
            },
            position: 'spider',
            connectorDistance: 0,
            fontWeight: 'bold',
            textBaseline: 'bottom',
            dy: -4
        })
        .style('radius', 4)
        .style('stroke', '#fff')
        .style('lineWidth', 2)
        .animate('enter', { type: 'waveIn' })
        .legend(false)

    chart.theme({ type: isDark.value ? 'dark' : 'light' })
    chart.render()
    return chart
}

const renderAllChart = () => {
    const list = []
    list.push(renderChart(dayChart.value, 'day', graphDataList.day, [
        'hour',
        'num'
    ]), renderChart(weekChart.value, 'week', graphDataList.week, [
        'day',
        'num'
    ]), renderPie(monthChart.value, graphDataList.topNewClass), renderPie(pieChart.value, graphDataList.topPaths))
    return list
}

watch(
    () => isDark.value,
    watchIsDark => {
        for (const chartitem of chartlist) {
            chartitem.theme({ type: watchIsDark ? 'dark' : 'light' })
            chartitem.render()
        }
    }
)

onMounted(async () => {
    try {
        const [response1, response2, response3, response4] = await Promise.all([
            getReqTop(),
            getTypetop(),
            getTimeHours(),
            getTimeday()
        ]);
        graphDataList.topPaths = await response1.data;
        graphDataList.topNewClass = await response2.data;
        graphDataList.day = await response3.data;
        graphDataList.week = await response4.data;
        chartlist = renderAllChart()
    } catch (error) {
        console.error('One of the requests failed:', error);
    }
})
</script>
<template>
    <div class="grid-cols-1 grid sm:grid-cols-2 gap-1 w-[75vw]">
        <div>
            <AnalyzeTitle :title="'今日请求走势'" />
            <div ref="dayChart" />
        </div>
        <div>
            <AnalyzeTitle :title="'本周请求走势'" />
            <div ref="weekChart" />
        </div>
        <div>
            <AnalyzeTitle :title="'最多类别的新闻 Top 10'" />
            <div ref="monthChart" />
        </div>
        <div>
            <AnalyzeTitle :title="'最多人浏览新闻的 Top 10'" />
            <div ref="pieChart" />
        </div>
    </div>
</template>
