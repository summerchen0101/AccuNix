<script lang="tsx">
import { defineComponent, toRefs } from "vue";
export default defineComponent({
  name: "SectionPanel",
  props: {
    title: String,
    icon: String,
  },
  setup(props, { slots }) {
    const { title, icon } = toRefs(props);

    return () => (
      <div class="bg-white rounded-md p-4 shadow-md">
        <div class="flex items-center">
          <div class="flex-1 flex items-center">
            {icon && (
              <i class={["text-gray-400 text-xl", icon.value].join(" ")}></i>
            )}
            <span class="text-lg text-gray-600 font-bold">{title.value}</span>
          </div>
          {slots.plus?.()}
        </div>
        {slots.default?.()}
        <div class="border-t border-gray-200 -mx-2 px-4 pt-3">
          {slots.footer?.()}
        </div>
      </div>
    );
  },
});
</script>
