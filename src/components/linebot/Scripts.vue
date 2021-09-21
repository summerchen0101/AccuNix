<script lang="ts">
import useScriptOverview from '@/service/useScriptOverview'
import { format, subDays } from 'date-fns'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const startAt = ref(subDays(new Date(), 8))
    const endAt = ref(subDays(new Date(), 1))
    const { list, fetchData, isLoading } = useScriptOverview()

    const onSearch = () => {
      const search = {
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

    return { startAt, endAt, list, isLoading, onSearch }
  },
})
</script>

<template>
  <SectionPanel title="觸發腳本與完成率">
    <template v-slot:default>
      <div class="mt-3 min-h-[300px]">
        <div class="flex space-x-2 mb-3">
          <el-date-picker
            type="date"
            size="small"
            v-model="startAt"
            placeholder="開始日期"
          ></el-date-picker>
          <span>~</span>
          <el-date-picker
            type="date"
            size="small"
            v-model="endAt"
            placeholder="結束日期"
          ></el-date-picker>
          <el-button type="primary" size="small" @click="onSearch">
            查詢
          </el-button>
        </div>
        <Spinner v-if="isLoading" />
        <template v-else>
          <el-table
            :data="list"
            stripe
            class="w-100"
            size="small"
            max-height="250"
          >
            <el-table-column prop="name" label="腳本名稱"></el-table-column>
            <el-table-column prop="total" label="開啟次數"></el-table-column>
            <el-table-column label="腳本完成率" align="center">
              <template #default="props">
                <span>{{ props.row.finish }}%</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </template>
  </SectionPanel>
</template>
