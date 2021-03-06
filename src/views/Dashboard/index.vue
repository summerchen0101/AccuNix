<script lang="ts">
import BotAssistant from '@/views/Dashboard/components/BotAssistant.vue'
import Activity from '@/views/Dashboard/components/charts/Activity.vue'
import Friends from '@/views/Dashboard/components/charts/Friends.vue'
import Keywords from '@/views/Dashboard/components/charts/Keywords.vue'
import Labels from '@/views/Dashboard/components/charts/Labels.vue'
import LifeCycle from '@/views/Dashboard/components/charts/LifeCycle.vue'
import Message from '@/views/Dashboard/components/charts/Message.vue'
import Scripts from '@/views/Dashboard/components/charts/Scripts.vue'
import useActiveMenu from '@/hooks/useActiveMenu'
import { useBotStore } from '@/service/store/botStore'
import useRichmenuOpts from '@/service/api/useInboxOpts'
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const botStore = useBotStore()
    const { bot, botGuid } = storeToRefs(botStore)
    useActiveMenu()
    const { fetchData, isLoading, list } = useRichmenuOpts()

    onMounted(() => {
      fetchData()
    })
    watch(
      () => botGuid,
      () => {
        fetchData()
      },
    )
    const selected = ref(1)

    watchEffect(() => {
      selected.value = bot.value.default_richmenu_id
    })
    return { bot }
  },
  components: {
    LifeCycle,
    Activity,
    Friends,
    Message,
    Labels,
    Keywords,
    Scripts,
    BotAssistant,
  },
})
</script>

<template>
  <div class="p-3">
    <div class="text-xl text-gray-600 tracking-wider py-3">數據總覽</div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div class="bg-white flex items-start rounded-md p-7 shadow-md text-sm text-gray-600 gap-x-3">
        <div class="bg-gray-300 h-14 w-14 rounded-full"></div>
        <BotAssistant :bot="bot" />
      </div>

      <div class="bg-white rounded-md shadow-md text-sm text-gray-600 flex flex-col gap-y-4 p-7">
        <div class="flex space-x-5">
          <div>Webhook 狀態：{{ bot?.webhook?.active ? '啟用中' : '未啟用' }}</div>
          <div>串接狀態：{{ bot?.webhook?.endpoint ? '已串接' : '未串接' }}</div>
        </div>
        <div class="flex items-center">
          Webhook 轉發：
          <div class="flex gap-1">
            <el-input size="small" placeholder="請輸入URL" />
            <el-button size="small" type="primary">驗證</el-button>
            <el-button size="small">編輯</el-button>
          </div>
        </div>
        <div class="flex gap-3 items-center">
          開啟轉發：
          <el-switch />
        </div>
      </div>
      <LifeCycle />
      <Activity />
      <Friends />
      <Message />
      <Labels />
      <Keywords />
      <Scripts />
    </div>
  </div>
</template>
