<script lang="ts">
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import PageIconBtn from '@/components/PageIconBtn.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import useInboxList from '@/service/useInboxList'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Columns {
  keyword: string
  desc: string
  action: string
  qrcode: string
  compare: string
  status: string
}

export default defineComponent({
  name: 'InboxList',
  components: {
    Layout,
    PageHeader,
    PageIconBtn,
  },
  setup() {
    const router = useRouter()
    const { activePage } = useLayoutState()
    const { fetchData } = useInboxList()
    const keyword = ref('')
    const page = ref(1)
    const tableData = reactive<Columns[]>(
      [...Array(5)].map(() => ({
        keyword: '天竺鼠車車',
        desc: '-',
        action: '-',
        qrcode: '-',
        compare: '-',
        status: '-',
      })),
    )
    onMounted(() => {
      activePage.value = 'Line'
      fetchData()
    })
    return { page, keyword, tableData }
  },
})
</script>

<template>
  <Layout>
    <PageHeader />
    <div class="p-3 mt-10 h-[calc(100%-40px)]">
      <div class="bg-white rounded-md h-full p-4">
        <div class="flex justify-between mb-3">
          <h3 class="text-gray-700 text-xl">
            <i class="fab fa-slack-hash mr-2"></i>
            主選單列表
          </h3>
          <router-link
            class="
              py-2
              px-4
              bg-blue-500
              text-white text-sm
              cursor-pointer
              hover:bg-blue-400
              rounded-md
            "
            :to="{ name: 'InboxCreate' }"
          >
            新增主選單
          </router-link>
        </div>
        <div>
          <div class="sm:inline-flex">
            <el-input size="small" v-model="keyword" placeholder="請輸入主選單">
              <template #append
                ><el-button icon="el-icon-search"></el-button
              ></template>
            </el-input>
          </div>
          <el-table :data="tableData" stripe class="w-100">
            <el-table-column prop="keyword" label="GUID"></el-table-column>
            <el-table-column prop="desc" label="說明"></el-table-column>
            <el-table-column prop="action" label="選單名稱"></el-table-column>
            <el-table-column prop="qrcode" label="選單說明"></el-table-column>
            <el-table-column prop="compare" label="圖片"></el-table-column>
            <el-table-column prop="status" label="人數"></el-table-column>
            <el-table-column prop="status" label="預設選單"></el-table-column>
            <el-table-column label="操作" :width="150">
              <div class="flex space-x-2">
                <PageIconBtn iconClass="fas fa-edit" />
                <PageIconBtn color="danger" iconClass="fas fa-trash-alt" />
              </div>
            </el-table-column>
          </el-table>
          <el-pagination
            v-model:currentPage="page"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
            class="mt-4"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
