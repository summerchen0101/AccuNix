<script lang="tsx">
import Layout from "@/components/Layout/Layout.vue";
import PageHeader from "@/components/Layout/PageHeader.vue";
import LineCharts from "@/components/linebot/LineCharts.vue";
import LineSettings from "@/components/linebot/LineSettings.vue";
import TabGroup from "@/components/TabGroup.vue";
import { OptionType } from "@/types";
import {
  computed,
  defineComponent,
  KeepAlive,
  reactive,
  ref,
  shallowRef,
  watch,
} from "vue";

export default defineComponent({
  name: "Home",
  components: {
    PageHeader,
  },
  setup() {
    const currentTab = ref<keyof typeof componentMap>("LineSettings");
    const currentAcc = ref(1);
    const tabOptions = reactive<OptionType<string>[]>([
      { label: "儀表板", value: "LineCharts" },
      { label: "機器人設定", value: "LineSettings" },
    ]);

    const componentMap = {
      LineCharts,
      LineSettings,
    };

    const TabContent = computed(() => componentMap[currentTab.value]);

    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10">
          <div class="flex flex-col sm:flex-row items-center mb-3">
            <TabGroup
              value={currentTab.value}
              onChange={(value) =>
                (currentTab.value = value as keyof typeof componentMap)
              }
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
          <KeepAlive>
            <TabContent.value />
          </KeepAlive>
        </div>
      </Layout>
    );
  },
});
</script>
