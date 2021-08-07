<script lang="tsx">
import { OptionType } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TabGroup",
  props: {
    value: [Number, String],
    options: Object as PropType<OptionType<number | string>[]>,
    onChange: Function as PropType<(value: number | string) => void>,
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
