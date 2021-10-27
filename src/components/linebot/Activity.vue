<script lang="ts">
import useHoursOverview from '@/service/useHoursOverview'
import { computed, defineComponent, onMounted } from 'vue'
import SectionPanel from '../SectionPanel.vue'
export default defineComponent({
  components: {
    SectionPanel,
  },
  setup() {
    const { fetchData, isLoading, list } = useHoursOverview()

    onMounted(() => {
      fetchData()
    })

    const chartOptions = computed(() => ({
      chart: {
        toolbar: {
          show: false,
        },
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: list.value.map((_, i) => i + 1),
      },
    }))
    const series = computed(() => [
      {
        name: '活躍用戶',
        data: list.value.map((t) => t.users),
      },
    ])
    return { isLoading, chartOptions, series }
  },
})
</script>

<template>
  <SectionPanel title="24小時好友活躍分佈">
    <template #default>
      <Spinner v-if="isLoading" />
      <div v-else class="mt-3">
        <div class="h-[300px]">
          <apexchart
            type="line"
            :options="chartOptions"
            :series="series"
            height="100%"
          ></apexchart>
        </div>
      </div>
    </template>
  </SectionPanel>
</template>
