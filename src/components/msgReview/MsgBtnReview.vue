<script lang="tsx">
import { MsgType } from "@/lib/enum";
import { MsgGroupType } from "@/views/keywords/Create.vue";
import { defineComponent, PropType, toRefs } from "vue";
import { MsgButton } from "../msgForm/MsgBtnForm.vue";

export default defineComponent({
  name: "MsgBtnReview",
  props: {
    msg: {
      type: Object as PropType<MsgGroupType>,
    },
  },
  setup(props) {
    const { content, title } = toRefs(props.msg);
    console.log(title, content);
    return () => (
      <div class="bg-gray-200 rounded-xl text-gray-600 py-1 px-2 msg-arrow relative mt-1  whitespace-pre-wrap max-w-[calc(100%-3.5rem)]">
        <p>{title.value}</p>
        {content.value}
      </div>
    );
  },
});
</script>
