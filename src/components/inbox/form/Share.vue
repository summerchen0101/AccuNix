<script lang="ts">
import { OptionType } from '@/types'
import { ActionForm } from '@/views/richmenu/Create.vue'
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
    const friends: OptionType<number>[] = [
      { label: '機器人一', value: 1 },
      { label: '機器人二', value: 2 },
    ]
    return { friends }
  },
})
</script>

<template>
  <el-form-item required>
    <el-select
      :modelValue="formData"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, value: val })"
      class="w-full"
      placeholder="選擇要分享的機器人"
      ><el-option v-for="t in friends" :key="t.value" :label="t.label" :value="t.value"> </el-option
    ></el-select>
  </el-form-item>
</template>
