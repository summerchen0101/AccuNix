<script lang="ts">
import CardPanel from '@/components/CardPanel.vue'
import { useGlobalState } from '@/providers/globalProvider'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CardPanel,
  },
  setup() {
    const { botInfo } = useGlobalState()
    const selected = ref(1)
    return { selected, botInfo }
  },
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      class="
        bg-white
        rounded-md
        px-4
        py-1
        shadow-md
        sm:col-span-2
        text-sm text-gray-600
        divide-y
      "
    >
      <div class="flex space-x-5 py-3">
        <div>標籤額度： {{ botInfo?.tagCount }}/{{ botInfo?.tagQuota }}</div>
        <div>好友數量： {{ botInfo?.usersCount }}</div>
      </div>
      <div class="flex space-x-5 py-3">
        <div>備註： {{ botInfo?.description || '-' }}</div>
        <div class="flex-1"></div>
        <a href="#" class="text-primary-500"> 編輯 </a>
      </div>
    </div>
    <CardPanel
      title="機器人主選單"
      icon="far fa-caret-square-left"
      desc="此為預設顯示於聊天室供用戶點選的選單，部分粉絲頁受歐盟隱私政策影響，將無法使用此功能"
      @setting="() => $router.push({ name: 'InboxList' })"
    >
      <div>
        <p class="text-gray-500 text-sm mb-1 font-bold">切換預設主選單:</p>
        <el-select v-model="selected" placeholder="請選擇主選單" size="small">
          <el-option :value="1" label="不設定主選單" />
        </el-select>
      </div>
    </CardPanel>
    <CardPanel
      title="自動回應設定"
      icon="far fa-caret-square-left"
      desc="提供 Messenger 自動回應訊息設定。"
    />
    <CardPanel
      title="關鍵字庫"
      icon="fab fa-slack-hash"
      desc="提供 Messenger 關鍵字互動，可藉由關鍵字動作：貼標籤、發送訊息、切換主選單、進入腳本、呼叫真人客服"
      @setting="() => $router.push({ name: 'KeywordList' })"
    />
    <CardPanel
      title="排程任務"
      icon="far fa-clock"
      desc="可指定時間透過 Messenger 發送訊息。"
    />
    <CardPanel
      title="好友管理"
      icon="far fa-user"
      desc="可以查看與搜尋 Messenger 好友。"
    />
    <CardPanel
      title="常用訊息庫"
      icon="far fa-comments"
      desc="提供 Messenger 常用訊息庫設定，支援多種樣式靈活調整。"
    />
    <CardPanel
      title="問券腳本"
      icon="far fa-sticky-note"
      desc="可透過問卷腳本，與問卷管理對接，完成好友個人基本資料或愛好蒐集。"
    />
  </div>
</template>
