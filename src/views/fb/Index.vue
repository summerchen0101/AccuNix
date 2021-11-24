<script lang="ts">
import { RouteProps } from '@/components/Breadcrumb.vue'
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import { useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import { OptionType } from '@/types'
import { defineComponent, onMounted } from 'vue'
import Breadcrumb from '../../components/Breadcrumb.vue'
import TabGroup from '@/components/TabGroup.vue'

export default defineComponent({
  components: {
    PageHeader,
    Layout,
    Breadcrumb,
    TabGroup,
  },
  setup() {
    const { activePage } = useLayoutState()
    const { fbBotGuid } = useGlobalState()
    onMounted(() => {
      activePage.value = 'Facebook'
    })
    const breadcrumb: RouteProps[] = [
      { name: '聊天機器人' },
      { name: 'Facebook儀表板' },
    ]

    const tabOptions: OptionType<string>[] = [
      { label: '儀表板', value: 'FbChart' },
      { label: '機器人設定', value: 'FbRobot' },
    ]
    return { breadcrumb, fbBotGuid, tabOptions }
  },
})
</script>

<template>
  <Layout>
    <PageHeader>
      <Breadcrumb :routes="breadcrumb" />
    </PageHeader>
    <div class="p-3 mt-10">
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
          <el-select class="flex-1 sm:w-64" v-model="fbBotGuid">
            <el-option :label="fbBotGuid" :value="fbBotGuid" />
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
