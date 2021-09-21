<script lang="ts">
import { computed, defineComponent, defineEmits, PropType } from 'vue'
import { MsgTextFields } from '../types'

const emit = defineEmits(['update:form'])
export default defineComponent({
  props: {
    form: {
      type: Object as PropType<MsgTextFields>,
      default: () => ({ content: '' } as MsgTextFields),
    },
  },
  setup(props) {
    const formData = computed({
      get: () => props.form,
      set: (val) => emit('update:form', val),
    })
    return { formData }
  },
})
</script>

<template>
  <el-form :model="formData" ref="form" label-position="top" label-width="80px">
    <el-form-item label="內容">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="formData.content"
        maxlength="100"
        show-word-limit
      />
    </el-form-item>
  </el-form>
</template>
