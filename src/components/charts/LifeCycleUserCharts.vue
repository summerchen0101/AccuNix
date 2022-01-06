<script lang="ts">
import DoughnutChart from '@/components/DoughnutChart.vue'
import { LifeCycle } from '@/service/useLifeCycleOverview'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<LifeCycle[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    return {}
  },
  components: { DoughnutChart },
})
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
    <div v-for="(t, i) in list" :key="i" class="flex flex-col py-5">
      <DoughnutChart
        :percentage="+t.users_percent"
        :count="t.users_count"
        :color="t.color"
      />
      <div class="mt-5 text-gray-600 text-center text-sm">
        {{ t.title }}
        <el-tooltip class="ml-2" effect="dark" :content="t.title">
          <i class="fas fa-question-circle"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
