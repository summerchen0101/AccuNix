<script lang="tsx">
import { defineComponent, reactive, ref } from "vue";
import Layout from "@/components/Layout/Layout.vue";
import TabGroup from "@/components/TabGroup.vue";
import { OptionType } from "@/types";

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
        <TabGroup
          value={currentTab.value}
          onChange={(value: number) => (currentTab.value = value)}
          options={tabOptions}
        />
      </Layout>
    );
  },
});
</script>
