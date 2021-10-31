<script lang="ts">
import { ActionForm } from '@/views/inbox/Create.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formData: {
      type: Object as PropType<ActionForm>,
      default: () => ({
        value: '',
        tags: [],
      }),
    },
  },
  emits: ['update:formData'],
  setup(props) {
    return {}
  },
})
</script>

<template>
  <el-form
    :model="formData"
    ref="form"
    label-position="top"
    class="mt-3 space-y-3"
  >
    <el-form-item required>
      <el-input
        type="textarea"
        :modelValue="formData.value"
        @update:modelValue="
          (val) => $emit('update:formData', { ...formData, value: val })
        "
        placeholder="輸入回覆文字"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
