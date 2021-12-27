<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import useTagOverview from '@/service/useTagOverview'
import { defineComponent, onMounted, ref, watch } from 'vue'
import SectionPanel from '../SectionPanel.vue'
import Spinner from '../Spinner.vue'
export default defineComponent({
  components: {
    SectionPanel,
    Spinner,
  },
  setup(props) {
    const selected = ref(1)
    const limit = ref(10)
    const { botGuid } = useGlobalState()
    const { list, fetchData, isLoading } = useTagOverview()
    onMounted(() => {
      fetchData()
    })
    watch(
      () => botGuid.value,
      () => {
        fetchData()
      },
    )
    return { selected, limit, list, isLoading }
  },
})
</script>

<template>
  <SectionPanel title="整體標籤概況">
    <template v-slot:default>
      <div class="mt-3 min-h-[300px]">
        <el-radio-group class="mb-3" v-model="selected">
          <el-radio :label="1">依人數呈現</el-radio>
          <el-radio :label="2">依觸發次數呈現</el-radio>
        </el-radio-group>
        <Spinner v-if="isLoading" />
        <template v-else>
          <el-table
            :data="list.slice(0, limit)"
            stripe
            class="w-100"
            size="small"
            max-height="280"
          >
            <el-table-column prop="name" label="標籤"></el-table-column>
            <el-table-column
              v-if="selected === 1"
              prop="user_count"
              label="人數"
            ></el-table-column>
            <el-table-column
              v-else
              prop="active_count"
              label="次數"
            ></el-table-column>
          </el-table>
        </template>
      </div>
    </template>

    <template v-slot:plus>
      <el-select v-model="limit" size="mini" class="w-24">
        <el-option label="前10標籤" :value="10" />
        <el-option label="前20標籤" :value="20" />
      </el-select>
    </template>
  </SectionPanel>
</template>
