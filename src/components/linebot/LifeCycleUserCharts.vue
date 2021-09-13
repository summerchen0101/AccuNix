<script lang="tsx">
import DoughnutChart from "@/components/DoughnutChart.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import useLifeCycleOverview from "@/service/useLifeCycleOverview";
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "LifeCycleUserCharts",
  props: {
    tab: Number,
  },
  emits: ["update:tab"],
  setup(props, { emit }) {
    const { fetchData, isLoading, data } = useLifeCycleOverview();
    fetchData();

    const tab = computed({
      get: () => props.tab,
      set: (val) => emit("update:tab", val),
    });

    return () => (
      <SectionPanel class="sm:col-span-2" title="用戶生命週期">
        {{
          default: () => [
            isLoading.value ? (
              <i class="fas fa-spinner fa-spin"></i>
            ) : (
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {data.value?.lifecycle.map((t, i) => (
                  <div key={i} class="flex flex-col py-5">
                    <DoughnutChart
                      percentage={+t.users_percent}
                      count={t.users_count}
                    />
                    <div class="mt-5 text-gray-600 text-center text-sm">
                      {t.title}
                      <el-tooltip
                        class="ml-2"
                        effect="dark"
                        content="特定時間加入, 尚未定義用戶類型暫存區"
                      >
                        <i class="fas fa-question-circle"></i>
                      </el-tooltip>
                    </div>
                  </div>
                ))}
              </div>
            ),
          ],
          plus: () => [
            <el-radio-group class="mb-3" v-model={tab.value}>
              <el-radio label={1}>用戶數據</el-radio>
              <el-radio label={2}>區間數據</el-radio>
            </el-radio-group>,
          ],
          footer: () => [
            <div class="flex space-x-4 text-sm text-gray-500">
              <div>平均點擊時間：{data.value?.averageClickDays || "-"} 天</div>
              <div>用戶生命週期：{data.value?.lifecycleDays || "-"} 天</div>
            </div>,
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
