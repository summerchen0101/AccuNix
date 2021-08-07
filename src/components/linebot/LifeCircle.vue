<script lang="tsx">
import DoughnutChart from "@/components/DoughnutChart.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LinebotLifeCircle",
  setup() {
    const selected = ref(1);

    return () => (
      <SectionPanel class="sm:col-span-2" title="用戶生命週期">
        {{
          default: () => [
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              <div class="flex flex-col py-5">
                <DoughnutChart />
                <div class="mt-5 text-gray-600 text-center text-sm">
                  新用戶
                  <el-tooltip
                    class="ml-2"
                    effect="dark"
                    content="特定時間加入, 尚未定義用戶類型暫存區"
                  >
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="flex flex-col py-5">
                <DoughnutChart />
                <div class="mt-5 text-gray-600 text-center text-sm">
                  無回應
                  <el-tooltip
                    class="ml-2"
                    effect="dark"
                    content="特定時間加入, 尚未定義用戶類型暫存區"
                  >
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="flex flex-col py-5">
                <DoughnutChart />
                <div class="mt-5 text-gray-600 text-center text-sm">
                  積極
                  <el-tooltip
                    class="ml-2"
                    effect="dark"
                    content="特定時間加入, 尚未定義用戶類型暫存區"
                  >
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="flex flex-col py-5">
                <DoughnutChart />
                <div class="mt-5 text-gray-600 text-center text-sm">
                  消極
                  <el-tooltip
                    class="ml-2"
                    effect="dark"
                    content="特定時間加入, 尚未定義用戶類型暫存區"
                  >
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="flex flex-col py-5">
                <DoughnutChart />
                <div class="mt-5 text-gray-600 text-center text-sm">
                  沈睡
                  <el-tooltip
                    class="ml-2"
                    effect="dark"
                    content="特定時間加入, 尚未定義用戶類型暫存區"
                  >
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </div>
              </div>
            </div>,
          ],
          plus: () => [
            <el-radio-group class="mb-3" v-model={selected.value}>
              <el-radio label={1}>用戶數據</el-radio>
              <el-radio label={2}>區間數據</el-radio>
            </el-radio-group>,
          ],
          footer: () => [
            <div class="flex space-x-4 text-sm text-gray-500">
              <div>平均點擊時間：- 天</div>
              <div>用戶生命週期：- 天</div>
            </div>,
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
