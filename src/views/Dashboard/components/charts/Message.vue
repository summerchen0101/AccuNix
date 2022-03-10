<script lang="ts">
import { useBotStore } from '@/service/store/botStore'
import { format, subDays } from 'date-fns'
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import useMessageTrand, { MessageTrand, MessageTrandReq } from '@/service/api/useMessageTrend'
import SectionPanel from '@/views/Dashboard/components/SectionPanel.vue'
import Spinner from '@/components/Spinner.vue'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4lang_zh_Hant from '@amcharts/amcharts4/lang/zh_Hant'

am4core.useTheme(am4themes_animated)

export default defineComponent({
  components: { SectionPanel, Spinner },
  setup(props) {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const botStore = useBotStore()
    const { fetchData, isLoading, list } = useMessageTrand()
    const onSearch = () => {
      const search: MessageTrandReq = {
        startAt: startAt.value ? format(startAt.value, 'yyyy-MM-dd') : undefined,
        endAt: endAt.value ? format(endAt.value, 'yyyy-MM-dd') : undefined,
      }
      fetchData(search)
    }
    onMounted(() => {
      onSearch()
    })
    watch(
      () => botStore.botGuid,
      () => {
        onSearch()
      },
    )
    const dataMap: Partial<Record<keyof MessageTrand, string>> = {
      reply: '自動回應',
      push: '主動推播',
    }
    const selected = ref<keyof MessageTrand>('reply')

    const myChart = ref(null)

    watchEffect(() => {
      let chart = am4core.create(myChart.value, am4charts.XYChart)
      chart.language.locale = am4lang_zh_Hant
      // Add data
      chart.data = list.value

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.DateAxis())
      // categoryAxis.dataFields.date = 'date'

      categoryAxis.renderer.minGridDistance = 20

      categoryAxis.dateFormats.setKey('day', 'MM/dd')
      categoryAxis.fontSize = 12

      // categoryAxis.dateFormatter = new am4core.DateFormatter()
      // categoryAxis.dateFormatter.dateFormat = 'MM-dd'

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.opposite = true
      valueAxis.fontSize = 12
      valueAxis.cursorTooltipEnabled = false
      // valueAxis.renderer.minGridDistance = 50
      valueAxis.min = 0
      // valueAxis.max = 20
      // valueAxis.extraMin = 0.2

      // Create series
      let series = chart.series.push(new am4charts.LineSeries())
      // series.name = 'Reply'
      series.stroke = am4core.color('#187FDD')
      series.strokeWidth = 2
      series.dataFields.valueY = selected.value
      series.dataFields.dateX = 'date'

      // Drop-shaped tooltips
      series.tooltip.getFillFromObject = false
      series.tooltip.background.fill = am4core.color('#187FDD')
      series.tooltip.label.fill = am4core.color('#fff')
      // series.tooltipText = '{reply}'

      // series.tooltipText = "{dateX.formatDate('MM/dd')}:{valueY}"
      series.tooltipText = '{valueY}'
      series.tooltip.label.textAlign = 'middle'

      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.lineY.disabled = true
      chart.cursor.behavior = 'none'
    })
    return {
      isLoading,
      startAt,
      endAt,
      selected,
      dataMap,
      onSearch,
      myChart,
    }
  },
})
</script>

<template>
  <SectionPanel title="訊息使用狀況">
    <Spinner v-if="isLoading" />
    <div class="mt-3">
      <div class="flex space-x-2 mb-3">
        <el-date-picker type="date" size="small" v-model="startAt" placeholder="開始日期"></el-date-picker>
        <span>~</span>
        <el-date-picker type="date" size="small" v-model="endAt" placeholder="結束日期"></el-date-picker>
        <el-button type="primary" size="small" @click="onSearch"> 查詢 </el-button>
      </div>
      <el-radio-group class="mb-3" v-model="selected">
        <el-radio v-for="[value, label] in Object.entries(dataMap)" :key="value" :label="value">{{ label }}</el-radio>
      </el-radio-group>
      <div class="h-[250px]">
        <div ref="myChart" class="w-full h-full"></div>
      </div>
    </div>
  </SectionPanel>
</template>
