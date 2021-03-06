<script lang="ts">
import Spinner from '@/components/Spinner.vue'
import { useBotStore } from '@/service/store/botStore'
import useKeywordTrand from '@/service/api/useKeywordTrend'
import SectionPanel from '@/views/Dashboard/components/SectionPanel.vue'
import { format, subDays } from 'date-fns'
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  setup(props) {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const { list, fetchData, isLoading } = useKeywordTrand()
    const botStore = useBotStore()
    const onSearch = () => {
      const search = {
        startAt: startAt.value ? format(startAt.value, 'yyyy-MM-dd') : undefined,
        endAt: endAt.value ? format(endAt.value, 'yyyy-MM-dd') : undefined,
      }
      fetchData(search)
    }
    onMounted(() => {
      onSearch()
    })
    watch(
      () => botStore.botGuid,
      () => {
        onSearch()
      },
    )
    return { startAt, endAt, list, isLoading, onSearch }
  },
  components: { SectionPanel, Spinner },
})
</script>

<template>
  <SectionPanel title="關鍵字趨勢">
    <template v-slot:default>
      <div class="mt-3 min-h-[300px]">
        <div class="flex space-x-2 mb-3">
          <el-date-picker type="date" size="small" v-model="startAt" placeholder="開始日期"></el-date-picker>
          <span>~</span>
          <el-date-picker type="date" size="small" v-model="endAt" placeholder="結束日期"></el-date-picker>
          <el-button type="primary" size="small" @click="onSearch"> 查詢 </el-button>
        </div>
        <Spinner v-if="isLoading" />
        <template v-else>
          <el-table :data="list" stripe class="w-100" size="small" max-height="250">
            <el-table-column prop="keyword" label="關鍵字"></el-table-column>
            <el-table-column label="整體佔比" align="center">
              <template #default="props">
                <span>{{ props.row.overall }}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="compared" label="與上區段對比"></el-table-column>
            <el-table-column prop="totalActiveCount" label="觸發次數"></el-table-column>
          </el-table>
        </template>
      </div>
    </template>
  </SectionPanel>
</template>
