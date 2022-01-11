<script lang="ts">
import CardPanel from '@/components/CardPanel.vue'
import LoadingCover from '@/components/LoadingCover.vue'
import { useGlobalState } from '@/providers/globalProvider'
import useRichmenuOpts from '@/service/useInboxOpts'
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  components: {
    CardPanel,
    LoadingCover,
  },
  setup() {
    const { botInfo, botGuid } = useGlobalState()
    const { fetchData, isLoading, list } = useRichmenuOpts()

    onMounted(() => {
      fetchData()
    })
    watch(
      () => botGuid.value,
      () => {
        fetchData()
      },
    )
    const selected = ref(1)

    watchEffect(() => {
      selected.value = botInfo.value.default_richmenu_id
    })
    return { selected, botInfo, isLoading, list }
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
        <div>加入好友： {{ botInfo?.followers }}</div>
        <div>封鎖好友： {{ botInfo?.blocks }}</div>
        <div class="flex-1"></div>
        <a href="#" class="text-primary-500"> 下載好友資訊 </a>
      </div>
      <div class="flex space-x-5 py-3">
        <div>
          Webhook 狀態 : {{ botInfo?.webhook.active ? '啟用中' : '未啟用' }}
        </div>
        <div>
          串接狀態 : {{ botInfo?.webhook.endpoint ? '已串接' : '未串接' }}
        </div>
      </div>
      <div class="flex space-x-5 py-3">
        <div>備註： {{ botInfo?.description || '-' }}</div>
        <div class="flex-1"></div>
        <a href="#" class="text-primary-500"> 編輯 </a>
      </div>
    </div>
    <LoadingCover :is-loading="isLoading">
      <CardPanel
        title="機器人主選單"
        icon="far fa-caret-square-left"
        desc="此為預設顯示於聊天室供用戶點選的圖文選單，若用戶有指定主選單，將以指定主選單為主"
        @setting="() => $router.push({ name: 'InboxList' })"
      >
        <div>
          <p class="text-gray-500 text-sm mb-1 font-bold">切換預設主選單:</p>
          <el-select v-model="selected" placeholder="請選擇主選單" size="small">
            <el-option
              v-for="opt in list"
              :key="opt.id"
              :value="opt.id"
              :label="opt.name"
            >
              <img
                :src="opt.image.path"
                class="rounded-full w-7 h-7 inline-block mr-2"
                alt=""
              />
              {{ opt.name }}
            </el-option>
          </el-select>
        </div>
      </CardPanel>
    </LoadingCover>
    <CardPanel
      title="自動回應設定"
      icon="far fa-caret-square-left"
      desc="提供 LINE 自動回應訊息設定。"
    />
    <CardPanel
      title="關鍵字庫"
      icon="fab fa-slack-hash"
      desc="提供 LINE
        關鍵字互動，可藉由關鍵字動作：貼標籤、發送訊息、切換主選單、進入腳本、呼叫真人客服。"
      @setting="() => $router.push({ name: 'KeywordList' })"
    />
    <CardPanel
      title="排程任務"
      icon="far fa-clock"
      desc="可指定時間發送訊息或切換主選單。"
    />
    <CardPanel
      title="好友管理"
      icon="far fa-user"
      desc="可以查看與搜尋 LINE 好友。"
    />
    <CardPanel
      title="常用訊息庫"
      icon="far fa-comments"
      desc="提供 LINE 常用訊息庫設定，支援多種樣式靈活調整。"
    />
    <CardPanel
      title="問券腳本"
      icon="far fa-sticky-note"
      desc="可透過問券腳本，與問券管理對接，完成好友個人基本資料或愛好蒐集。"
    />
  </div>
</template>
