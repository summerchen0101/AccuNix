<script lang="tsx">
import SectionPanel from '@/components/SectionPanel.vue'
import Spinner from '@/components/Spinner.vue'
import useLifeCycleTrand, {
  LifeCycleTrandReq,
} from '@/service/useLifeCycleTrend'
import { format, subDays } from 'date-fns'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'LifeCyclePeriodsCharts',
  props: {
    tab: Number,
  },
  emits: ['update:tab'],
  setup(props, { emit }) {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const { fetchData, isLoading, data } = useLifeCycleTrand()

    const onSearch = () => {
      const search: LifeCycleTrandReq = {
        startAt: startAt.value
          ? format(startAt.value, 'yyyy-MM-dd')
          : undefined,
        endAt: endAt.value ? format(endAt.value, 'yyyy-MM-dd') : undefined,
      }
      fetchData(search)
    }

    onMounted(() => {
      onSearch()
    })

    const tab = computed({
      get: () => props.tab,
      set: (val) => emit('update:tab', val),
    })

    const chartOptions = computed(() => ({
      chart: {
        height: 350,
        width: 500,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#3366FF', '#9AE214', '#33C9F7', '#FFB03A', '#FF7B6F'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: data.value.map((t) => t.date),
      },
    }))

    const series = computed(() => [
      {
        name: '新用戶',
        data: data.value.map((t) => t[1]),
      },
      {
        name: '無回應',
        data: data.value.map((t) => t[2]),
      },
      {
        name: '積極',
        data: data.value.map((t) => t[3]),
      },
      {
        name: '消極',
        data: data.value.map((t) => t[4]),
      },
      {
        name: '沈睡',
        data: data.value.map((t) => t[5]),
      },
    ])

    return () => (
      <SectionPanel class="lg:col-span-2" title="用戶生命週期">
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
                <div class="h-[380px]">
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
          plus: () => [
            <el-radio-group class="mb-3" v-model={tab.value}>
              <el-radio label={1}>用戶數據</el-radio>
              <el-radio label={2}>區間數據</el-radio>
            </el-radio-group>,
          ],
        }}
      </SectionPanel>
    )
  },
})
</script>
