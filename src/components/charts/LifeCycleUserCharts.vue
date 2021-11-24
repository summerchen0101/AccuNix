<script lang="ts">
import DoughnutChart from '@/components/DoughnutChart.vue'
import SectionPanel from '@/components/SectionPanel.vue'
import { BotType } from '@/lib/enum'
import useLifeCycleOverview from '@/service/useLifeCycleOverview'
import { computed, defineComponent, PropType } from 'vue'
import Spinner from '../Spinner.vue'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<BotType>,
      required: true,
    },
    tab: Number,
  },
  emits: ['update:tab'],
  setup(props, { emit }) {
    const { fetchData, isLoading, data } = useLifeCycleOverview(props.type)
    fetchData()
    const localTab = computed({
      get: () => props.tab,
      set: (val) => emit('update:tab', val),
    })
    return { isLoading, data, localTab }
  },
  components: { SectionPanel, DoughnutChart, Spinner },
})
</script>

<template>
  <SectionPanel class="lg:col-span-2" title="用戶生命週期">
    <template v-slot:default>
      <Spinner v-if="isLoading" />
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <div
          v-for="(t, i) in data?.lifecycle"
          :key="i"
          class="flex flex-col py-5"
        >
          <DoughnutChart
            :percentage="+t.users_percent"
            :count="t.users_count"
          />
          <div class="mt-5 text-gray-600 text-center text-sm">
            {{ t.title }}
            <el-tooltip
              class="ml-2"
              effect="dark"
              content="特定時間加入, 尚未定義用戶類型暫存區"
            >
              <i class="fas fa-question-circle"></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:plus>
      <el-radio-group class="mb-3" v-model="localTab">
        <el-radio :label="1">用戶數據</el-radio>
        <el-radio :label="2">區間數據</el-radio>
      </el-radio-group>
    </template>
    <template v-slot:footer>
      <div class="flex space-x-4 text-sm text-gray-500">
        <div>平均點擊時間：{{ data?.averageClickDays || '-' }} 天</div>
        <div>用戶生命週期：{{ data?.lifecycleDays || '-' }} 天</div>
      </div>
    </template>
  </SectionPanel>
</template>
