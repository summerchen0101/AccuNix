<script lang="ts">
import { defineComponent } from 'vue'

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
  },
  setup(props) {
    return {}
  },
})
</script>

<template>
  <el-progress
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
      <span class="text-blue-500">占比{{ percentage }}%</span>
    </div>
  </el-progress>
</template>

<style scoped></style>
