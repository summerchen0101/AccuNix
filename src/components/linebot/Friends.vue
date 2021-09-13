<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { format, subDays } from "date-fns";
import useFriendTrand, {
  FriendTrand,
  FriendTrandReq,
} from "../../service/useFriendTrend";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "LinebotFriends",
  components: {
    PageHeader,
  },
  setup() {
    const startAt = ref(subDays(new Date(), 8));
    const endAt = ref(subDays(new Date(), 1));
    const { fetchData, isLoading, data } = useFriendTrand();

    const onSearch = () => {
      const search: FriendTrandReq = {
        startAt: startAt.value
          ? format(startAt.value, "yyyy-MM-dd")
          : undefined,
        endAt: endAt.value ? format(endAt.value, "yyyy-MM-dd") : undefined,
      };
      fetchData(search);
    };

    onMounted(() => {
      onSearch();
    });

    const dataMap: Partial<Record<keyof FriendTrand, string>> = {
      cumulativeFollowers: "累積好友",
      dailyFollowers: "每日加入",
      cumulativeBlocks: "累積封鎖",
      dailyBlocks: "每日封鎖",
    };

    const selected = ref<keyof FriendTrand>("cumulativeFollowers");
    const chartOptions = computed(() => ({
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
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
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: data.value.map((t) => format(new Date(t.date), "M-dd")),
      },
    }));
    const series = computed(() => [
      {
        name: dataMap[selected.value],
        data: data.value.map((t) => t[selected.value]),
      },
    ]);
    return () => (
      <SectionPanel title="好友總人數分析">
        {{
          default: () => [
            isLoading.value ? (
              <Spinner />
            ) : (
              <div class="mt-3">
                <div class="flex space-x-2 mb-3">
                  <el-date-picker
                    type="date"
                    size="small"
                    v-model={startAt.value}
                    placeholder="開始日期"
                  ></el-date-picker>
                  <span>~</span>
                  <el-date-picker
                    type="date"
                    size="small"
                    v-model={endAt.value}
                    placeholder="結束日期"
                  ></el-date-picker>
                  <el-button type="primary" size="small" onClick={onSearch}>
                    查詢
                  </el-button>
                </div>
                <el-radio-group class="mb-3" v-model={selected.value}>
                  {Object.entries(dataMap).map(([value, label]) => (
                    <el-radio label={value}>{label}</el-radio>
                  ))}
                </el-radio-group>
                <div class="h-[250px]">
                  <apexchart
                    type="line"
                    options={chartOptions.value}
                    series={series.value}
                    height="100%"
                  ></apexchart>
                </div>
              </div>
            ),
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
