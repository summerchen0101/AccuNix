<script lang="ts">
import { RouteProps } from '@/components/Breadcrumb.vue'
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
    const { lineBotGuid } = useGlobalState()
    onMounted(() => {
      activePage.value = 'Line'
    })
    const breadcrumb: RouteProps[] = [
      { name: '聊天機器人' },
      { name: 'Line儀表板' },
    ]

    const tabOptions: OptionType<string>[] = [
      { label: '儀表板', value: 'LineChart' },
      { label: '機器人設定', value: 'LineRobot' },
    ]
    return { breadcrumb, lineBotGuid, tabOptions }
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
          <el-select class="flex-1 sm:w-64" v-model="lineBotGuid">
            <el-option :label="lineBotGuid" :value="lineBotGuid" />
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
