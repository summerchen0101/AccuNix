<script lang="ts">
import { useLineBotState } from '@/providers/lineBotProvider'
import { OptionType } from '@/types'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TabGroup from './TabGroup.vue'

const tabOptions: OptionType<string>[] = [
  { label: '儀表板', value: 'LineChart' },
  { label: '機器人設定', value: 'LineSetting' },
]

export default defineComponent({
  // props: {
  //   currentTab: String
  // },
  name: 'LinebotCtrl',
  setup() {
    const { lineBotGuid } = useLineBotState()
    return { lineBotGuid, tabOptions }
  },
  components: { TabGroup },
})
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center mb-3">
    <TabGroup
      :value="$route.name.toString()"
      @change="
        (val) =>
          $router.push({
            name: val.toString(),
          })
      "
      :options="tabOptions"
    />
    <div class="flex-1"></div>
    <div class="flex space-x-3 w-full sm:w-auto mt-3 sm:mt-0">
      <el-select class="flex-1 sm:w-64" v-model="lineBotGuid">
        <el-option label="AccuNix-POC (@5db13bab)" value="5db13bab" />
      </el-select>
      <div
        class="
          bg-blue-500
          text-white
          hover:bg-blue-400
          w-9
          h-9
          rounded-sm
          flex
          items-center
          justify-center
          cursor-pointer
        "
      >
        <i class="fas fa-plus"></i>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
