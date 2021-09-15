<script lang="tsx">
import PageHeader from '@/components/Layout/PageHeader.vue'
import SectionPanel from '@/components/SectionPanel.vue'
import { defineComponent, reactive, ref } from 'vue'

interface Columns {
  keyword: string
  percent: number
  count: number
  compare: string
}
export default defineComponent({
  name: 'LinebotKeywords',
  components: {
    PageHeader,
  },
  setup() {
    const tableData = reactive<Columns[]>(
      [...Array(5)].map(() => ({
        keyword: '天竺鼠車車',
        percent: 48,
        count: 12,
        compare: '-',
      })),
    )

    return () => (
      <SectionPanel title="關鍵字趨勢">
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
              <el-table data={tableData} stripe class="w-100" size="small">
                <el-table-column
                  prop="keyword"
                  label="關鍵字"
                ></el-table-column>
                <el-table-column label="整體佔比" align="center">
                  {{
                    default: ({ row }: { row: Columns }) => [
                      <span>{row.percent}%</span>,
                    ],
                  }}
                </el-table-column>
                <el-table-column
                  prop="compare"
                  label="與上區段對比"
                ></el-table-column>
                <el-table-column
                  prop="count"
                  label="觸發次數"
                ></el-table-column>
              </el-table>
            </div>,
          ],
        }}
      </SectionPanel>
    )
  },
})
</script>
