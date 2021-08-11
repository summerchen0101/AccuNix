<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "LinebotMessage",
  components: {
    PageHeader,
  },
  setup() {
    const selected = ref(1);
    const chartOptions = reactive({
      chart: {
        toolbar: {
          show: false,
        },
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    });
    const series = reactive([
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ]);

    return () => (
      <SectionPanel title="訊息使用狀況">
        {{
          default: () => [
            <div class="mt-3">
              <div class="flex space-x-3 mb-3">
                <el-date-picker
                  type="daterange"
                  unlink-panels
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                ></el-date-picker>
              </div>
              <el-radio-group class="mb-3" v-model={selected.value}>
                <el-radio label={1}>自動回應</el-radio>
                <el-radio label={2}>主動推播</el-radio>
              </el-radio-group>
              <apexchart
                type="line"
                options={chartOptions}
                series={series}
              ></apexchart>
            </div>,
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
