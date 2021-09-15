<script lang="tsx">
import PageHeader from '@/components/Layout/PageHeader.vue'
import SectionPanel from '@/components/SectionPanel.vue'
import { defineComponent, reactive, ref } from 'vue'

interface Columns {
  name: string
  count: number
  percent: number
}
export default defineComponent({
  name: 'LinebotScripts',
  components: {
    PageHeader,
  },
  setup() {
    const tableData = reactive<Columns[]>(
      [...Array(5)].map(() => ({
        name: '購買行為',
        count: 8,
        percent: 48,
      })),
    )

    return () => (
      <SectionPanel title="觸發腳本與完成率">
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
                <el-table-column prop="name" label="腳本名稱"></el-table-column>
                <el-table-column
                  label="開啟次數"
                  prop="count"
                ></el-table-column>
                <el-table-column
                  prop="percent"
                  label="腳本完成率"
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
