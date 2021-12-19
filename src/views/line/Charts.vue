<script lang="ts">
import Activity from '@/components/charts/Activity.vue'
import Friends from '@/components/charts/Friends.vue'
import Keywords from '@/components/charts/Keywords.vue'
import Labels from '@/components/charts/Labels.vue'
import LifeCycle from '@/components/charts/LifeCycle.vue'
import Message from '@/components/charts/Message.vue'
import Scripts from '@/components/charts/Scripts.vue'
import { BotType } from '@/lib/enum'
import { productTypeMap } from '@/lib/maps'
import { useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import { defineComponent, onMounted, watchEffect } from 'vue'

export default defineComponent({
  components: {
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
    const { lineBotGuid, breadcrumb, botType, botGuid } = useGlobalState()
    // onMounted(() => {
    //   activePage.value = 'lineBasic'
    // })

    // watchEffect(() => {
    //   breadcrumb.value = botType.value
    //     ? [
    //         { name: '機器人管理' },
    //         {
    //           name: `${productTypeMap[botType.value]}-${botGuid.value}`,
    //           mobileShow: true,
    //         },
    //         { name: '儀表板', mobileShow: true },
    //       ]
    //     : []
    // })

    return { botType: BotType.LINE }
  },
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
    <LifeCycle :type="botType" />
    <Activity :type="botType" />
    <Friends :type="botType" />
    <Message :type="botType" />
    <Labels :type="botType" />
    <Keywords :type="botType" />
    <Scripts :type="botType" />
  </div>
</template>
