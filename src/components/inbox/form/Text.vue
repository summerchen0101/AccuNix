<script lang="ts">
import { ActionForm } from '@/views/inbox/Create.vue'
import { defineComponent, PropType, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    formData: Object as PropType<ActionForm>,
    default: () => ({
      type: 'message',
      message: '',
    }),
  },
  emits: ['update:formData'],
  setup(props) {
    const route = useRoute()
    watch(
      () => route,
      () => {
        console.log(props.formData)
      },
    )
    return {}
  },
})
</script>

<template>
  <el-form-item required>
    <el-input
      type="textarea"
      :modelValue="formData.message"
      @update:modelValue="
        (val) => $emit('update:formData', { ...formData, message: val })
      "
      :rows="3"
      placeholder="輸入回覆文字"
    ></el-input>
  </el-form-item>
</template>
