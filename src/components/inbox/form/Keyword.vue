<script lang="ts">
import { OptionType } from '@/types'
import { ActionForm } from '@/views/richmenu/Create.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formData: Object as PropType<ActionForm>,
  },
  emits: ['update:formData'],
  setup(props) {
    const keywords: OptionType<number>[] = [
      { label: '關鍵字一', value: 1 },
      { label: '關鍵字二', value: 2 },
    ]
    return { keywords }
  },
})
</script>

<template>
  <el-form-item required>
    <el-select
      :modelValue="formData.keyword"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, keyword: val })"
      class="w-full"
      placeholder="請選擇關鍵字"
      ><el-option v-for="t in keywords" :key="t.value" :label="t.label" :value="t.value"> </el-option
    ></el-select>
  </el-form-item>
</template>
