<script lang="ts">
import { BotType } from '@/lib/enum'
import { useBotStore } from '@/service/store/botStore'
import useLifeCycleTrand, { LifeCycleTrandReq } from '@/service/api/useLifeCycleTrend'
import { format, subDays } from 'date-fns'
import { computed, defineComponent, onMounted, ref, PropType, watch, watchEffect } from 'vue'
import SectionPanel from '@/views/Dashboard/components/SectionPanel.vue'
import Spinner from '@/components/Spinner.vue'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4lang_zh_Hant from '@amcharts/amcharts4/lang/zh_Hant'
import { LifeCycle } from '@/service/api/useLifeCycleOverview'
import { keyBy } from 'lodash'

am4core.useTheme(am4themes_animated)

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<LifeCycle[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const botStore = useBotStore()
    const { fetchData, isLoading, list } = useLifeCycleTrand()
    const onSearch = () => {
      const search: LifeCycleTrandReq = {
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
      categoryAxis.startLocation = 0.5
      categoryAxis.endLocation = 0.5

      // categoryAxis.dateFormatter = new am4core.DateFormatter()
      // categoryAxis.dateFormatter.dateFormat = 'MM-dd'

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.opposite = true
      valueAxis.fontSize = 12
      // valueAxis.cursorTooltipEnabled = false
      // valueAxis.renderer.minGridDistance = 50
      valueAxis.min = 0
      // valueAxis.max = 20
      // valueAxis.extraMin = 0.2

      // Create series

      Array(5)
        .fill('')
        .forEach((_, i) => {
          let series = chart.series.push(new am4charts.LineSeries())
          series.name = props.list[i].title
          series.fill = am4core.color(props.list[i].color)
          series.stroke = am4core.color(props.list[i].color)
          series.strokeWidth = 2
          series.dataFields.valueY = (i + 1).toString()
          series.dataFields.dateX = 'date'
          series.stacked = true
          series.fillOpacity = 0.3
          series.visible = true

          // Drop-shaped tooltips
          series.tooltip.getFillFromObject = false
          series.tooltip.background.fill = am4core.color(props.list[i].color)
          series.tooltip.label.fill = am4core.color('#fff')
          // series.tooltipText = '{reply}'

          // series.tooltipText = "{dateX.formatDate('MM/dd')}:{valueY}"
          // series.calculatePercent = true
          series.tooltipText = `{valueY}`
          series.tooltip.label.textAlign = 'middle'
        })

      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor()
      // chart.cursor.lineY.disabled = true
      chart.cursor.behavior = 'none'
      chart.legend = new am4charts.Legend()
    })
    return {
      isLoading,
      startAt,
      endAt,
      onSearch,
      myChart,
    }
  },
  components: { Spinner },
})
</script>

<template>
  <Spinner v-if="isLoading" />
  <div v-else class="mt-3">
    <div class="flex space-x-2 mb-3">
      <el-date-picker type="date" size="small" v-model="startAt" placeholder="開始日期"></el-date-picker>
      <span>~</span>
      <el-date-picker type="date" size="small" v-model="endAt" placeholder="結束日期"></el-date-picker>
      <el-button type="primary" size="small" @click="onSearch"> 查詢 </el-button>
    </div>
    <div class="h-[380px]">
      <div ref="myChart" class="w-full h-full"></div>
    </div>
  </div>
</template>
