<script lang="ts">
import { RouteProps } from '@/components/Breadcrumb.vue'
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import Activity from '@/components/linebot/Activity.vue'
import Friends from '@/components/linebot/Friends.vue'
import Keywords from '@/components/linebot/Keywords.vue'
import Labels from '@/components/linebot/Labels.vue'
import LifeCycle from '@/components/linebot/LifeCycle.vue'
import Message from '@/components/linebot/Message.vue'
import Scripts from '@/components/linebot/Scripts.vue'
import LinebotCtrl from '@/components/LinebotCtrl.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import { defineComponent, onMounted } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'

export default defineComponent({
  name: 'LineChart',
  components: {
    PageHeader,
    LinebotCtrl,
    Layout,
    Breadcrumb,
    LifeCycle,
    Activity,
    Friends,
    Message,
    Labels,
    Keywords,
    Scripts,
  },
  setup() {
    const { activePage } = useLayoutState()
    onMounted(() => {
      activePage.value = 'Line'
    })
    const breadcrumb: RouteProps[] = [
      { name: '聊天機器人' },
      { name: 'LINE儀表板' },
    ]
    return { breadcrumb }
  },
})
</script>

<template>
  <Layout>
    <PageHeader>
      <Breadcrumb :routes="breadcrumb" />
    </PageHeader>
    <div class="p-3 mt-10">
      <LinebotCtrl />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <LifeCycle />
        <Activity />
        <Friends />
        <Message />
        <Labels />
        <Keywords />
        <Scripts />
      </div>
    </div>
  </Layout>
</template>
