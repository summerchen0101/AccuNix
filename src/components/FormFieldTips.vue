<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      default: "fas fa-info-circle",
    },
    content: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex space-x-2 items-center text-gray-500 leading-7">
        <i class={props.iconClass}></i>
        <div>{props.content}</div>
      </div>
    );
  },
});
</script>

<style scoped></style>
