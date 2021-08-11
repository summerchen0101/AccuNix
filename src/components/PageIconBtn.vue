<script lang="tsx">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      default: "fas fa-check",
    },
    color: {
      type: String,
      default: "gray",
    },
    onClick: Function as PropType<() => void>,
  },
  setup(props) {
    return () => (
      <div
        class={`text-white rounded-sm inline-flex items-center justify-center cursor-pointer h-8 w-8 text-sm bg-${props.color}-500 hover:bg-${props.color}-400`}
        onClick={props.onClick}
      >
        <i class={props.iconClass}></i>
      </div>
    );
  },
});
</script>
