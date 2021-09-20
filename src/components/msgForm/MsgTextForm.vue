<script lang="ts" setup>
import { computed, defineEmits, defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    form: {
      content: string
    }
  }>(),
  {
    form: () => ({
      content: '',
    }),
  },
)
const emit = defineEmits(['update:form'])
const formData = computed({
  get: () => props.form,
  set: (val) => emit('update:form', val),
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
