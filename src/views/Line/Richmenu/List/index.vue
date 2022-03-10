<script lang="ts">
import PageIconBtn from '@/components/PageIconBtn.vue'
import useActiveMenu from '@/hooks/useActiveMenu'
import { orderTypeMap, productTypeMap } from '@/lib/maps'
import { useBotStore } from '@/service/store/botStore'
import useInboxList, { InboxListReq } from '@/service/api/useInboxList'
import { defineComponent, onMounted, reactive, watch, watchEffect } from 'vue'
import { useGlobalState } from '@/providers/globalProvider'

export default defineComponent({
  name: 'InboxList',
  components: {
    PageIconBtn,
  },
  setup() {
    useActiveMenu()
    const { breadcrumb } = useGlobalState()
    const botStore = useBotStore()
    watchEffect(() => {
      breadcrumb.value = botStore.productType
        ? [
            { name: '機器人管理' },
            {
              name: `${productTypeMap[botStore.productType]}-${botStore.productType}`,
              mobileShow: true,
            },
            { name: '主選單列表', mobileShow: true },
          ]
        : []
    })

    const { fetchData, isLoading, list, meta } = useInboxList()
    const req = reactive<InboxListReq>({ page: 1 })
    const onPageChange = (page: number) => {
      req.page = page
      fetchData(req)
    }
    const onSortChange = ({ column, prop, order }) => {
      req.sort = prop
      req.order = orderTypeMap[order]
      req.page = 1
      fetchData(req)
    }
    onMounted(() => {
      fetchData(req)
    })
    watch(
      () => botStore.botGuid,
      () => {
        fetchData(req)
      },
    )

    return {
      req,
      isLoading,
      list,
      fetchData,
      meta,
      onPageChange,
      onSortChange,
    }
  },
})
</script>

<template>
  <div class="p-3 h-full">
    <div class="bg-white rounded-md h-full p-4">
      <div class="flex justify-between mb-3">
        <h3 class="text-gray-700 text-xl">
          <i class="fab fa-slack-hash mr-2"></i>
          主選單列表
        </h3>
        <router-link
          class="py-2 px-4 bg-primary-500 text-white text-sm cursor-pointer hover:bg-primary-400 rounded-md"
          :to="{ name: 'LineRichmenuCreate' }"
        >
          新增主選單
        </router-link>
      </div>
      <div>
        <div class="sm:inline-flex">
          <el-input size="small" v-model="req.search" placeholder="請輸入主選單" clearable>
            <template #append><el-button icon="el-icon-search" @click="fetchData(req)"></el-button></template>
          </el-input>
        </div>
        <el-table :data="list" stripe class="w-100" v-loading="isLoading" @sort-change="onSortChange">
          <el-table-column prop="guid" label="GUID"></el-table-column>
          <el-table-column prop="name" label="選單名稱" sortable="custom"></el-table-column>
          <el-table-column :formatter="(row) => row.description || '-'" label="選單說明"></el-table-column>
          <el-table-column label="圖片">
            <template #default="scope">
              <a :href="scope.row.image_path" target="_blank"><img :src="scope.row.image_path" alt="" /> </a>
            </template>
          </el-table-column>
          <el-table-column prop="users_count" label="人數"></el-table-column>
          <el-table-column :formatter="(row) => (row.is_default ? '是' : '否')" label="預設選單"> </el-table-column>
          <el-table-column prop="created_at" label="建立時間" sortable="custom"></el-table-column>
          <el-table-column label="操作" prop :width="150">
            <template #default>
              <div class="flex space-x-2">
                <PageIconBtn iconClass="fas fa-edit" />
                <PageIconBtn color="danger" iconClass="fas fa-trash-alt" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- {{ meta.per_page }} -->
        <el-pagination
          v-if="meta"
          v-model:currentPage="req.page"
          :page-size="meta.per_page"
          layout="prev, pager, next, jumper"
          :total="meta.total"
          class="mt-4"
          @current-change="onPageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
