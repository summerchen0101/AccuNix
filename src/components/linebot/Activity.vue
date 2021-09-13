<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "LinebotActivity",
  components: {
    PageHeader,
  },
  setup() {
    const chartOptions = reactive({
      chart: {
        height: 400,
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    });
    const series = reactive([44, 55, 13, 43, 22]);

    return () => (
      <SectionPanel title="24小時好友活躍分佈">
        {{
          default: () => [
            <div class="mt-3">
              <div class="h-[300px]">
                <apexchart
                  type="pie"
                  options={chartOptions}
                  series={series}
                  height="100%"
                ></apexchart>
              </div>
            </div>,
          ],
        }}
      </SectionPanel>
    );
  },
});
</script>
