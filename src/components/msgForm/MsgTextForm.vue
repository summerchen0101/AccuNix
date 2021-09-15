<script lang="tsx">
import { MsgGroupType } from '@/views/keywords/Create.vue'
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue'
import { MsgText } from '../msgReview/MsgTextReview.vue'

export default defineComponent({
  name: 'MsgTextForm',
  props: {
    group: {
      type: Object as PropType<MsgGroupType>,
      default: () => ({}),
    },
  },
  emits: ['update:group'],
  setup(props, { emit }) {
    const group = computed({
      get: () => props.group,
      set: (val) => emit('update:group', val),
    })
    return () => (
      <>
        <el-form-item label="文字內容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model={group.value.content}
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </>
    )
  },
})
</script>
