<script lang="ts">
import { BreadcrumbItem } from '@/providers/globalProvider'
import Layout from '@/components/Layout/Layout.vue'
import TabGroup from '@/components/TabGroup.vue'
import { useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import { OptionType } from '@/types'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {
    Layout,
    TabGroup,
  },
  setup() {
    const { activePage } = useLayoutState()
    const { botGuid } = useGlobalState()
    onMounted(() => {
      activePage.value = 'Facebook'
    })
    const breadcrumb: BreadcrumbItem[] = [
      { name: '聊天機器人' },
      { name: 'Facebook儀表板' },
    ]

    const tabOptions: OptionType<string>[] = [
      { label: '儀表板', value: 'FbChart' },
      { label: '機器人設定', value: 'FbRobot' },
    ]
    return { breadcrumb, botGuid, tabOptions }
  },
})
</script>

<template>
  <Layout>
    <div class="p-3">
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
          <el-select class="flex-1 sm:w-52" v-model="botGuid">
            <el-option :label="botGuid" :value="botGuid" />
          </el-select>
          <div class="ctrl-btn">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </Layout>
</template>
