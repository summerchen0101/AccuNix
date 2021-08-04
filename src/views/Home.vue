<script lang="tsx">
import { defineComponent, reactive, ref } from "vue";
import Layout from "@/components/Layout/Layout.vue";
import TabGroup from "@/components/TabGroup.vue";
import { OptionType } from "@/types";
import CardPanel from "@/components/CardPanel.vue";

export default defineComponent({
  name: "Home",
  setup() {
    const currentTab = ref(1);
    const tabOptions = reactive<OptionType<number>[]>([
      { label: "儀表板", value: 1 },
      { label: "機器人設定", value: 2 },
    ]);
    return () => (
      <Layout>
        <div class="py-3">
          <TabGroup
            value={currentTab.value}
            onChange={(value: number) => (currentTab.value = value)}
            options={tabOptions}
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardPanel
            title="自動回應設定"
            icon="far fa-caret-square-left"
            desc="提供 LINE 自動回應訊息設定。"
          />
          <CardPanel
            title="關鍵字庫"
            icon="fab fa-slack-hash"
            desc="提供 LINE 關鍵字互動，可藉由關鍵字動作：貼標籤、發送訊息、切換主選單、進入腳本、呼叫真人客服。"
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
            title="問卷腳本"
            icon="far fa-sticky-note"
            desc="可透過問卷腳本，與問卷管理對接，完成好友個人基本資料或愛好蒐集。"
          />
        </div>
      </Layout>
    );
  },
});
</script>
