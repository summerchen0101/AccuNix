<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { useLayoutState } from "@/providers/layoutProvider";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { Chart, Grid, Line } from "vue3-charts";

const data = [
  { name: "Jan", pl: 1000, avg: 500, inc: 300 },
  { name: "Feb", pl: 2000, avg: 900, inc: 400 },
  { name: "Apr", pl: 400, avg: 400, inc: 500 },
  { name: "Mar", pl: 3100, avg: 1300, inc: 700 },
  { name: "May", pl: 200, avg: 100, inc: 200 },
  { name: "Jun", pl: 600, avg: 400, inc: 300 },
  { name: "Jul", pl: 500, avg: 90, inc: 100 },
];
export default defineComponent({
  name: "LinebotMessage",
  components: {
    PageHeader,
  },
  setup() {
    const { isMiniSidebar } = useLayoutState();
    const wrapperRef = ref(null);
    const selected = ref(1);
    const tableData = ref(data);
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });
    const chartW = ref(200);

    const resizeChart = () => {
      chartW.value = wrapperRef.value.clientWidth;
    };
    watch(isMiniSidebar, () => {
      setTimeout(() => {
        chartW.value = wrapperRef.value.clientWidth;
      }, 200);
    });
    onMounted(() => {
      resizeChart();
      window.addEventListener("resize", resizeChart);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeChart);
    });
    return () => (
      <SectionPanel title="訊息使用狀況">
        {{
          default: () => [
            <div ref={wrapperRef} class="mt-3">
              <div class="flex space-x-3 mb-3">
                <el-date-picker
                  type="daterange"
                  unlink-panels
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                ></el-date-picker>
                <el-button size="small">搜尋</el-button>
              </div>
              <el-radio-group class="mb-3" v-model={selected.value}>
                <el-radio label={1}>自動回應</el-radio>
                <el-radio label={2}>主動推播</el-radio>
              </el-radio-group>
              <Chart
                size={{ width: chartW.value, height: 400 }}
                data={tableData.value}
                margin={margin.value}
                direction={direction.value}
              >
                {{
                  layers: () => [
                    <>
                      <Grid strokeDasharray="2,2" />
                      <Line dataKeys={["name", "pl"]} />
                    </>,
                  ],
                }}
              </Chart>
            </div>,
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
