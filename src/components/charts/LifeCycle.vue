<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import LifeCycleUserCharts from './LifeCycleUserCharts.vue'
import LifeCyclePeriodsCharts from './LifeCyclePeriodsCharts.vue'
import { BotType } from '@/lib/enum'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<BotType>,
      required: true,
    },
  },
  setup() {
    const selected = ref(1)
    return { selected }
  },
  components: { LifeCycleUserCharts, LifeCyclePeriodsCharts },
})
</script>

<template>
  <LifeCycleUserCharts
    v-if="selected === 1"
    v-model:tab="selected"
    :type="type"
  />
  <LifeCyclePeriodsCharts v-else v-model:tab="selected" :type="type" />
</template>
