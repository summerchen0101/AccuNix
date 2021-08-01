<script lang="tsx">
import { OptionType } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TabGroup",
  props: {
    value: Number,
    options: Object as PropType<OptionType<number>[]>,
    onChange: Function as PropType<(value: number) => void>,
  },
  setup(props) {
    return () => (
      <div class="flex space-x-2">
        {props.options?.map((t) => (
          <div
            class={["tab", props.value === t.value && "active"].join(" ")}
            onClick={() => props.onChange?.(t.value)}
          >
            {t.label}
          </div>
        ))}
      </div>
    );
  },
});
</script>
