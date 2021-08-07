<script lang="tsx">
import { defineComponent, onMounted, watchEffect } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <el-progress
        type="dashboard"
        percentage={80}
        indeterminate={true}
        duration={5}
        color="#aaa"
        stroke-width={10}
        class="flex flex-col justify-center"
      >
        <div class="flex flex-col justify-center space-y-2">
          <span class="text-2xl text-gray-600">80人</span>
          <span class="text-blue-500">占比20%</span>
        </div>
      </el-progress>
    );
  },
});
</script>

<style scoped></style>
