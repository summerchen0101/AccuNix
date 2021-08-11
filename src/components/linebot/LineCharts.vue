<script lang="tsx">
import LinebotActivity from "@/components/linebot/Activity.vue";
import LinebotFriends from "@/components/linebot/Friends.vue";
import LinebotMessage from "@/components/linebot/Message.vue";
import LinebotLifeCircle from "@/components/linebot/LifeCircle.vue";
import LinebotLabels from "@/components/linebot/Labels.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LineChart",
  setup() {
    return () => (
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <LinebotLifeCircle />
        <LinebotActivity />
        <LinebotFriends />
        <LinebotMessage />
        <LinebotLabels />
      </div>
    );
  },
});
</script>
