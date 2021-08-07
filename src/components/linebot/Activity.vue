<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "LinebotActivity",
  components: {
    PageHeader,
  },
  setup() {
    const selected = ref(1);
    const limit = ref(10);
    const tableData = reactive(
      [...Array(2)].map(() => ({
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      }))
    );
    return () => (
      <SectionPanel title="24小時好友活躍分佈">
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
                <el-button size="small">搜尋</el-button>
              </div>
              <el-radio-group class="mb-3" v-model={selected.value}>
                <el-radio label={1}>用戶數據</el-radio>
                <el-radio label={2}>區間數據</el-radio>
              </el-radio-group>
              <el-table data={tableData} stripe class="w-100" size="small">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </div>,
          ],
          plus: () => [
            <el-select v-model={limit.value} size="mini" class="w-24">
              <el-option label="前10標籤" value={10} />
              <el-option label="前20標籤" value={20} />
            </el-select>,
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
