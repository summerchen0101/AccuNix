<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import useHoursOverview from '@/service/api/useHoursOverview'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { defineComponent, onMounted, ref, watch } from 'vue'
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
    const colorChart = ref(null)
    const createChart = () => {
      let chart = am4core.create(colorChart.value, am4charts.XYChart)

      // Add data
      chart.data = list.value.map((t, i) => ({
        hours: i,
        users: t.users,
      }))

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'hours'
      // categoryAxis.title.text = 'Countries'
      categoryAxis.renderer.minGridDistance = 20

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      // valueAxis.title.text = 'Litres sold (M)'

      // Create series
      let series = chart.series.push(new am4charts.LineSeries())
      series.name = 'Users'
      series.stroke = am4core.color('#187FDD')
      series.strokeWidth = 2
      series.dataFields.valueY = 'users'
      series.dataFields.categoryX = 'hours'

      // Drop-shaped tooltips
      series.tooltip.getFillFromObject = false
      // series.tooltip.pointerOrientation = 'left'
      // series.tooltip.label.propertyFields.fill = 'color'
      // series.tooltip.background.propertyFields.stroke = 'color'
      // series.tooltip.background.cornerRadius = 40
      series.tooltip.background.fill = am4core.color('#187FDD')
      series.tooltip.label.fill = am4core.color('#fff')
      series.tooltipText = '{users}'
      // series.tooltip.background.strokeOpacity = 0
      // series.tooltip.pointerOrientation = 'vertical'
      series.tooltip.label.textAlign = 'middle'

      // Make bullets grow on hover
      // let bullet = series.bullets.push(new am4charts.CircleBullet())
      // bullet.circle.fill = am4core.color('#fff')

      // let bullethover = bullet.states.create('hover')
      // bullethover.properties.scale = 1.3

      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.lineY.disabled = true
      chart.cursor.behavior = 'none'
      // chart.cursor.xAxis = categoryAxis
      // chart.cursor.snapToSeries = series
    }

    watch(
      () => list.value,
      () => {
        createChart()
      },
    )
    return { colorChart }
  },
})
</script>

<template>
  <SectionPanel title="24小時好友活躍分佈">
    <div ref="colorChart" class="w-full h-full"></div>
  </SectionPanel>
</template>
