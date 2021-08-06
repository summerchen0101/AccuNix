<script lang="tsx">
import CardPanel from "@/components/CardPanel.vue";
import Layout from "@/components/Layout/Layout.vue";
import TabGroup from "@/components/TabGroup.vue";
import PageHeader from "@/components/Layout/PageHeader.vue";
import { OptionType } from "@/types";
import createSlot from "@/utils/createSlot.vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    PageHeader,
  },
  setup() {
    const selected = ref("1");
    const currentTab = ref(1);
    const currentAcc = ref(1);
    const tabOptions = reactive<OptionType<number>[]>([
      { label: "儀表板", value: 1 },
      { label: "機器人設定", value: 2 },
    ]);

    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10">
          <div class="flex flex-col sm:flex-row items-center mb-3">
            <TabGroup
              value={currentTab.value}
              onChange={(value: number) => (currentTab.value = value)}
              options={tabOptions}
            />
            <div class="flex-1"></div>
            <div class="flex space-x-3 w-full sm:w-auto mt-3 sm:mt-0">
              <el-select class="flex-1 sm:w-64" v-model={currentAcc.value}>
                <el-option label="AccuNix-POC (@755ncvge)" value={1} />
              </el-select>
              <div class="bg-blue-500 text-white hover:bg-blue-400 w-9 h-9 rounded-sm flex items-center justify-center cursor-pointer">
                <i class="fas fa-plus"></i>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white rounded-md px-4 py-1 shadow-md sm:col-span-2 text-sm text-gray-600 divide-y">
              <div class="flex space-x-5 py-3">
                <div>標籤額度： 0/500</div>
                <div>加入好友： 1</div>
                <div>封鎖好友： 0</div>
                <div class="flex-1"></div>
                <a href="#" class="text-blue-500">
                  下載好友資訊
                </a>
              </div>
              <div class="flex space-x-5 py-3">
                <div>Webhook 狀態 : 啟用中</div>
                <div>串接狀態 : 已串接</div>
              </div>
              <div class="flex space-x-5 py-3">
                <div>備註</div>
                <div class="flex-1"></div>
                <a href="#" class="text-blue-500">
                  編輯
                </a>
              </div>
            </div>
            <CardPanel
              title="機器人主選單"
              icon="far fa-caret-square-left"
              desc="此為預設顯示於聊天室供用戶點選的圖文選單，若用戶有指定主選單，將以指定主選單為主"
            >
              {createSlot(
                <div>
                  <p class="text-gray-500 text-sm mb-1 font-bold">
                    切換預設主選單:
                  </p>
                  <el-select
                    v-model={selected.value}
                    placeholder="請選擇主選單"
                    size="small"
                  >
                    <el-option value="1" label="不設定主選單" />
                  </el-select>
                </div>
              )}
            </CardPanel>
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
        </div>
      </Layout>
    );
  },
});
</script>
