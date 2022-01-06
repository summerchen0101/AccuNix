<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)
export default defineComponent({
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#187FDD',
    },
  },
  setup(props) {
    const myChart = ref(null)

    watchEffect(() => {
      let chart = am4core.create(myChart.value, am4charts.PieChart)
      chart.innerRadius = am4core.percent(60)
      // Add data
      chart.data = [
        {
          percent: 100 - props.percentage,
          label: 'total',
          color: am4core.color('#ccc'),
        },
        {
          percent: props.percentage,
          label: 'data',
          color: am4core.color(props.color),
        },
      ]
      let pieSeries = chart.series.push(new am4charts.PieSeries())
      pieSeries.dataFields.value = 'percent'
      pieSeries.dataFields.category = 'label'
      pieSeries.slices.template.propertyFields.fill = 'color'

      pieSeries.slices.template.tooltipText = ''

      pieSeries.labels.template.disabled = true
      pieSeries.ticks.template.disabled = true

      let hs = pieSeries.slices.template.states.getKey('hover')
      hs.properties.scale = 1
      let as = pieSeries.slices.template.states.getKey('active')
      as.properties.shiftRadius = 0

      let label = pieSeries.createChild(am4core.Label)
      // label.text = 'Hi there!'
      label.text = `[font-size: 22px]${props.count.toString()}人\n[#187FDD]佔比${props.percentage.toString()}%[/]`
      label.horizontalCenter = 'middle'
      label.verticalCenter = 'middle'
      label.fontSize = 16
      label.textAlign = 'middle'
    })
    return { myChart }
  },
})
</script>

<template>
  <!-- <el-progress
    type="dashboard"
    :percentage="percentage"
    :indeterminate="true"
    :duration="5"
    color="#aaa"
    :stroke-width="10"
    class="flex flex-col justify-center"
  >
    <div class="flex flex-col justify-center space-y-2">
      <span class="text-2xl text-gray-600">{{ count }}人</span>
      <span class="text-primary-500">占比{{ percentage }}%</span>
    </div>
  </el-progress> -->
  <div ref="myChart" class="w-full h-full"></div>
</template>

<style scoped></style>
