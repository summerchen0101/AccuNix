<script lang="tsx">
import { MsgType } from '@/lib/enum'
import { computed, defineComponent, PropType, toRefs } from 'vue'

export interface MsgButton {
  type: MsgType.Button
  title: string
  content: string
  // btnLabel: string;
  // btnAction: number;
}

export default defineComponent({
  name: 'MsgBtnForm',
  props: {
    group: {
      type: Object as PropType<MsgButton>,
      default: () => ({ title: '11', content: '22' }),
    },
  },
  setup(props, { emit }) {
    const group = computed({
      get: () => props.group,
      set: (val) => emit('update:group', val),
    })
    return () => (
      <>
        <el-form-item label="標題">
          <el-input v-model={group.value.title}></el-input>
        </el-form-item>
        <el-form-item label="內文">
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
