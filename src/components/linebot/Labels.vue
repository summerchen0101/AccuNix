<script lang="ts" setup>
import SectionPanel from '@/components/SectionPanel.vue'
import useTagOverview from '@/service/useTagOverview'
import { ref } from 'vue'

const selected = ref(1)
const limit = ref(10)
const { list, fetchData, isLoading } = useTagOverview()

await fetchData()
</script>

<template>
  <SectionPanel title="整體標籤概況">
    <template v-slot:default>
      <div class="mt-3">
        <el-radio-group class="mb-3" v-model="selected">
          <el-radio :label="1">依人數呈現</el-radio>
          <el-radio :label="2">依觸發次數呈現</el-radio>
        </el-radio-group>
        <el-table
          :data="list"
          stripe
          class="w-100 h-96 overflow-y-auto"
          size="small"
          max-height="250"
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
      </div>
    </template>

    <template v-slot:plus>
      <el-select v-model="limit" size="mini" class="w-24">
        <el-option label="前10標籤" value="{10}" />
        <el-option label="前20標籤" value="{20}" />
      </el-select>
    </template>
  </SectionPanel>
</template>
