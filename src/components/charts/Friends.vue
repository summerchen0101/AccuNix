<script lang="ts">
import SectionPanel from '@/components/SectionPanel.vue'
import Spinner from '@/components/Spinner.vue'
import { BotType } from '@/lib/enum'
import { useGlobalState } from '@/providers/globalProvider'
import { format, subDays } from 'date-fns'
import { computed, defineComponent, onMounted, ref, PropType, watch } from 'vue'
import useFriendTrand, {
  FriendTrand,
  FriendTrandReq,
} from '../../service/useFriendTrend'

export default defineComponent({
  components: {
    Spinner,
    SectionPanel,
  },
  setup(props) {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const { fetchData, isLoading, data } = useFriendTrand()
    const { botGuid } = useGlobalState()

    const onSearch = () => {
      const search: FriendTrandReq = {
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
    watch(
      () => botGuid.value,
      () => {
        onSearch()
      },
    )

    const dataMap: Partial<Record<keyof FriendTrand, string>> = {
      cumulativeFollowers: '累積好友',
      dailyFollowers: '每日加入',
      cumulativeBlocks: '累積封鎖',
      dailyBlocks: '每日封鎖',
    }

    const selected = ref<keyof FriendTrand>('cumulativeFollowers')
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
      series,
      isLoading,
      chartOptions,
      selected,
      startAt,
      endAt,
      dataMap,
      onSearch,
    }
  },
})
</script>

<template>
  <SectionPanel title="好友總人數分析">
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
