<script lang="tsx">
import { defineComponent, ref } from "vue";
import LifeCyclePeriodsChartsVue from "./LifeCyclePeriodsCharts.vue";
import LifeCycleUserChartsVue from "./LifeCycleUserCharts.vue";

export default defineComponent({
  name: "LinebotLifeCycle",
  setup() {
    const selected = ref(1);

    return () => (
      <>
        {selected.value === 1 ? (
          <LifeCycleUserChartsVue v-model={[selected.value, "tab"]} />
        ) : (
          <LifeCyclePeriodsChartsVue v-model={[selected.value, "tab"]} />
        )}
      </>
    );
  },
});
</script>
