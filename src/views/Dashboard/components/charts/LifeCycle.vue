<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import useLifeCycleOverview from '@/service/api/useLifeCycleOverview'
import { defineComponent, onMounted, ref, watch } from 'vue'
import DoughnutChart from '../DoughnutChart.vue'
import SectionPanel from '@/views/Dashboard/components/SectionPanel.vue'
import Spinner from '@/components/Spinner.vue'
import LifeCyclePeriodsCharts from './LifeCyclePeriodsCharts.vue'
import LifeCycleUserCharts from './LifeCycleUserCharts.vue'

export default defineComponent({
  setup() {
    const { botGuid } = useGlobalState()
    const { fetchData, isLoading, data } = useLifeCycleOverview()
    onMounted(() => {
      fetchData()
    })
    watch(
      () => botGuid.value,
      () => {
        fetchData()
      },
    )
    const selected = ref(1)
    return { selected, isLoading, data }
  },
  components: {
    SectionPanel,
    LifeCyclePeriodsCharts,
    LifeCycleUserCharts,
    Spinner,
  },
})
</script>

<template>
  <SectionPanel class="lg:col-span-2" title="用戶生命週期">
    <template v-slot:default>
      <Spinner v-if="isLoading" />
      <LifeCycleUserCharts v-if="selected === 1" :list="data?.lifecycle" />
      <LifeCyclePeriodsCharts v-else :list="data?.lifecycle" />
    </template>
    <template v-slot:plus>
      <el-radio-group class="mb-3" v-model="selected">
        <el-radio :label="1">用戶數據</el-radio>
        <el-radio :label="2">區間數據</el-radio>
      </el-radio-group>
    </template>
    <template v-if="selected === 1" v-slot:footer>
      <div class="flex space-x-4 text-sm text-gray-500">
        <div>平均點擊時間：{{ data?.averageClickDays || '-' }} 天</div>
        <div>用戶生命週期：{{ data?.lifecycleDays || '-' }} 天</div>
      </div>
    </template>
  </SectionPanel>
</template>
