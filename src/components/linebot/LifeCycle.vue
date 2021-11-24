<script lang="ts">
import { defineComponent, ref } from 'vue'
import LifeCycleUserCharts from './LifeCycleUserCharts.vue'
import LifeCyclePeriodsCharts from './LifeCyclePeriodsCharts.vue'

export default defineComponent({
  setup() {
    const selected = ref(1)
    return { selected }
  },
  components: { LifeCycleUserCharts, LifeCyclePeriodsCharts },
})
</script>

<template>
  <LifeCycleUserCharts v-if="selected === 1" v-model:tab="selected" />
  <LifeCyclePeriodsCharts v-else v-model:tab="selected" />
</template>
