<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import useHoursOverview from '@/service/api/useHoursOverview'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import SectionPanel from '../SectionPanel.vue'

am4core.useTheme(am4themes_animated)

export default defineComponent({
  components: {
    SectionPanel,
  },
  setup(props) {
    const { fetchData, isLoading, list } = useHoursOverview()
    const { botGuid } = useGlobalState()
    onMounted(() => {
      fetchData()
    })
    watch(
      () => botGuid.value,
      () => {
        fetchData()
      },
    )
    const myChart = ref(null)

    watchEffect(() => {
      let chart = am4core.create(myChart.value, am4charts.XYChart)

      // Add data
      chart.data = list.value.map((t, i) => ({
        hours: i,
        users: t.users,
      }))

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'hours'
      categoryAxis.renderer.minGridDistance = 20
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.fontSize = 12

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.opposite = true
      valueAxis.fontSize = 12
      valueAxis.cursorTooltipEnabled = false

      // Create series
      let series = chart.series.push(new am4charts.LineSeries())
      series.name = 'Users'
      series.stroke = am4core.color('#187FDD')
      series.strokeWidth = 2
      series.dataFields.valueY = 'users'
      series.dataFields.categoryX = 'hours'

      // Drop-shaped tooltips
      series.tooltip.getFillFromObject = false
      series.tooltip.background.fill = am4core.color('#187FDD')
      series.tooltip.label.fill = am4core.color('#fff')
      series.tooltipText = '{users}'
      series.tooltip.label.textAlign = 'middle'

      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.lineY.disabled = true
      chart.cursor.behavior = 'none'
    })
    return { myChart }
  },
})
</script>

<template>
  <SectionPanel title="24小時好友活躍分佈">
    <div class="h-[350px] pt-6">
      <div ref="myChart" class="w-full h-full"></div>
    </div>
  </SectionPanel>
</template>
