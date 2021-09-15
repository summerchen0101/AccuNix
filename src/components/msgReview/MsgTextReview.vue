<script lang="tsx">
import { MsgType } from '@/lib/enum'
import { MsgGroupType } from '@/views/keywords/Create.vue'
import { defineComponent, PropType, toRefs } from 'vue'

export interface MsgText {
  type: MsgType.Text
  content: string
}

export default defineComponent({
  name: 'MsgTextReview',
  props: {
    msg: Object as PropType<MsgGroupType>,
  },
  setup(props) {
    const { content } = toRefs(props.msg)
    return () => (
      <div
        hidden={!content.value}
        class="bg-gray-200 rounded-xl text-gray-600 py-1 px-2 msg-arrow relative mt-1  whitespace-pre-wrap max-w-[calc(100%-3.5rem)]"
      >
        {content.value}
      </div>
    )
  },
})
</script>
