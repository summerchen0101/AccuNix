<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "LinebotLabels",
  components: {
    PageHeader,
  },
  setup() {
    const selected = ref<keyof typeof tableMap>(1);
    const limit = ref(10);
    const tableData = reactive(
      [...Array(5)].map(() => ({
        label: "積極買家",
        count: 12,
      }))
    );
    const tableMap = {
      [1]: (
        <el-table data={tableData} stripe class="w-100" size="small">
          <el-table-column prop="label" label="標籤"></el-table-column>
          <el-table-column prop="count" label="人數"></el-table-column>
        </el-table>
      ),
      [2]: (
        <el-table data={tableData} stripe class="w-100" size="small">
          <el-table-column prop="label" label="標籤"></el-table-column>
          <el-table-column prop="count" label="次數"></el-table-column>
        </el-table>
      ),
    };

    return () => (
      <SectionPanel title="整體標籤概況">
        {{
          default: () => [
            <div class="mt-3">
              <el-radio-group class="mb-3" v-model={selected.value}>
                <el-radio label={1}>依人數呈現</el-radio>
                <el-radio label={2}>依觸發次數呈現</el-radio>
              </el-radio-group>
              {tableMap[selected.value]}
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
