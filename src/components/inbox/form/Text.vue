<script lang="ts">
import { ActionForm } from '@/views/inbox/Create.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formData: Object as PropType<ActionForm>,
  },
  emits: ['update:formData'],
  setup(props) {
    return {}
  },
})
</script>

<template>
  <el-form-item required>
    <el-input
      type="textarea"
      :modelValue="formData.keyword"
      @update:modelValue="
        (val) => $emit('update:formData', { ...formData, value: val })
      "
      :rows="3"
      placeholder="輸入回覆文字"
    ></el-input>
  </el-form-item>
</template>
