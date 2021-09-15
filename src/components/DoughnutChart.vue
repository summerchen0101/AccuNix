<script lang="tsx">
import { defineComponent, onMounted, toRef, toRefs, watchEffect } from 'vue'

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
    const { percentage, count } = toRefs(props)
    return () => (
      <el-progress
        type="dashboard"
        percentage={percentage.value}
        indeterminate={true}
        duration={5}
        color="#aaa"
        stroke-width={10}
        class="flex flex-col justify-center"
      >
        <div class="flex flex-col justify-center space-y-2">
          <span class="text-2xl text-gray-600">{count.value}人</span>
          <span class="text-blue-500">占比{percentage.value}%</span>
        </div>
      </el-progress>
    )
  },
})
</script>

<style scoped></style>
