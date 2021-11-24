<script lang="ts">
import { format, subDays } from 'date-fns'
import { computed, defineComponent, onMounted, ref } from 'vue'
import useMessageTrand, {
  MessageTrand,
  MessageTrandReq,
} from '../../service/useMessageTrend'
import SectionPanel from '../SectionPanel.vue'
import Spinner from '../Spinner.vue'

export default defineComponent({
  setup() {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const { fetchData, isLoading, data } = useMessageTrand()
    const onSearch = () => {
      const search: MessageTrandReq = {
        startAt: startAt.value
          ? format(startAt.value, 'yyyy-MM-dd')
          : undefined,
        endAt: endAt.value ? format(endAt.value, 'yyyy-MM-dd') : undefined,
      }
      fetchData(search)
    }
    onMounted(() => {
      onSearch()
    })
    const dataMap: Partial<Record<keyof MessageTrand, string>> = {
      reply: '自動回應',
      push: '主動推播',
    }
    const selected = ref<keyof MessageTrand>('reply')
    const chartOptions = computed(() => ({
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
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
        categories: data.value.map((t) => format(new Date(t.date), 'M-dd')),
      },
    }))
    const series = computed(() => [
      {
        name: dataMap[selected.value],
        data: data.value.map((t) => t[selected.value]),
      },
    ])
    return {
      isLoading,
      startAt,
      endAt,
      selected,
      series,
      chartOptions,
      dataMap,
      onSearch,
    }
  },
  components: { SectionPanel, Spinner },
})
</script>

<template>
  <SectionPanel title="訊息使用狀況">
    <Spinner v-if="isLoading" />
    <div v-else class="mt-3">
      <div class="flex space-x-2 mb-3">
        <el-date-picker
          type="date"
          size="small"
          v-model="startAt"
          placeholder="開始日期"
        ></el-date-picker>
        <span>~</span>
        <el-date-picker
          type="date"
          size="small"
          v-model="endAt"
          placeholder="結束日期"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="onSearch">
          查詢
        </el-button>
      </div>
      <el-radio-group class="mb-3" v-model="selected">
        <el-radio
          v-for="[value, label] in Object.entries(dataMap)"
          :key="value"
          :label="value"
          >{{ label }}</el-radio
        >
      </el-radio-group>
      <div class="h-[250px]">
        <apexchart
          type="line"
          :options="chartOptions"
          :series="series"
          height="100%"
        ></apexchart>
      </div>
    </div>
  </SectionPanel>
</template>
