<template>
  <div></div>
</template>

<script lang="tsx">
import Layout from "@/components/Layout/Layout.vue";
import PageHeader from "@/components/Layout/PageHeader.vue";
import PageIconBtn from "@/components/PageIconBtn.vue";
import { defineComponent, reactive, ref } from "vue";

interface Columns {
  keyword: string;
  desc: string;
  action: string;
  qrcode: string;
  compare: string;
  status: string;
}

export default defineComponent({
  name: "KeywordList",
  setup() {
    const activeTab = ref("first");
    const keyword = ref("");
    const tableData = reactive<Columns[]>(
      [...Array(5)].map(() => ({
        keyword: "天竺鼠車車",
        desc: "-",
        action: "-",
        qrcode: "-",
        compare: "-",
        status: "-",
      }))
    );
    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10 h-full">
          <div class="bg-white rounded-md h-full p-4">
            <div class="flex justify-between mb-3">
              <h3 class="text-gray-700 text-xl">
                <i class="fab fa-slack-hash mr-2"></i>
                關鍵字庫
              </h3>
              <div class="py-2 px-4 bg-blue-500 text-white text-sm cursor-pointer hover:bg-blue-400 rounded-md">
                新增關鍵字
              </div>
            </div>
            <div>
              <el-tabs v-model={activeTab.value} type="card">
                <el-tab-pane label="關鍵字庫" name="first">
                  <div class="sm:inline-flex">
                    <el-input
                      size="small"
                      v-model={keyword.value}
                      placeholder="請輸入關鍵字"
                    >
                      {{
                        append: () => [
                          <el-button icon="el-icon-search"></el-button>,
                        ],
                      }}
                    </el-input>
                  </div>
                  <el-table data={tableData} stripe class="w-100">
                    <el-table-column
                      prop="keyword"
                      label="關鍵字"
                    ></el-table-column>
                    <el-table-column prop="desc" label="說明"></el-table-column>
                    <el-table-column
                      prop="action"
                      label="觸發動作"
                    ></el-table-column>
                    <el-table-column
                      prop="qrcode"
                      label="QR code"
                    ></el-table-column>
                    <el-table-column
                      prop="compare"
                      label="模糊比對"
                    ></el-table-column>
                    <el-table-column
                      prop="status"
                      label="啟用狀態"
                    ></el-table-column>
                    <el-table-column label="操作" width={150}>
                      <div class="flex space-x-2">
                        <PageIconBtn
                          onClick={() => console.log("clicked")}
                          iconClass="fas fa-edit"
                        />
                        <PageIconBtn
                          color="red"
                          iconClass="fas fa-trash-alt"
                          onClick={() => console.log("clicked")}
                        />
                      </div>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="垃圾桶" name="second">
                  <el-table data={tableData} stripe class="w-100">
                    <el-table-column
                      prop="keyword"
                      label="關鍵字"
                    ></el-table-column>
                    <el-table-column prop="desc" label="說明"></el-table-column>

                    <el-table-column label="操作" width={150}>
                      <div class="flex space-x-2">
                        <PageIconBtn
                          iconClass="fas fa-reply"
                          onClick={() => console.log("clicked")}
                        />
                      </div>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </Layout>
    );
  },
});
</script>

<style scoped></style>
