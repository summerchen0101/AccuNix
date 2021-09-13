<script lang="tsx">
import Layout from "@/components/Layout/Layout.vue";
import PageHeader from "@/components/Layout/PageHeader.vue";
import LinebotActivity from "@/components/linebot/Activity.vue";
import LinebotFriends from "@/components/linebot/Friends.vue";
import LinebotKeywords from "@/components/linebot/Keywords.vue";
import LinebotLabels from "@/components/linebot/Labels.vue";
import LinebotLifeCycle from "@/components/linebot/LifeCycle.vue";
import LinebotMessage from "@/components/linebot/Message.vue";
import LinebotScripts from "@/components/linebot/Scripts.vue";
import LineRobotCtrlVue from "@/components/LinebotCtrl.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LineChart",
  components: {
    PageHeader,
  },
  setup() {
    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10">
          <LineRobotCtrlVue />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <LinebotLifeCycle />
            <LinebotActivity />
            <LinebotFriends />
            <LinebotMessage />
            <LinebotLabels />
            <LinebotKeywords />
            <LinebotScripts />
          </div>
        </div>
      </Layout>
    );
  },
});
</script>
