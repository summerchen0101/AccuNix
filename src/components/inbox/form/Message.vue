<script lang="ts">
import { OptionType } from '@/types'
import { ActionForm } from '@/views/richmenu/Create.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formData: {
      type: Object as PropType<ActionForm>,
      default: () => ({
        type: 'send_messages',
        messageGuid: '',
        tags: [],
      }),
    },
  },
  emits: ['update:formData'],
  setup(props) {
    const tags: OptionType<number>[] = [
      { label: '標籤一', value: 1 },
      { label: '標籤二', value: 2 },
    ]
    const msgs: OptionType<number>[] = [
      { label: '常用訊息一', value: 1 },
      { label: '常用訊息二', value: 2 },
    ]
    return { tags, msgs }
  },
})
</script>

<template>
  <el-form-item required>
    <el-select
      :modelValue="formData.messageGuid"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, messageGuid: val })"
      class="w-full"
      placeholder="選擇要發送的常用訊息"
      ><el-option v-for="tag in msgs" :key="tag.value" :label="tag.label" :value="tag.value"> </el-option
    ></el-select>
  </el-form-item>
  <el-form-item label="標籤設定">
    <el-select
      :modelValue="formData.tags"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, tags: val })"
      class="w-full"
      multiple
    >
      <el-option v-for="tag in tags" :key="tag.value" :label="tag.label" :value="tag.value"> </el-option
    ></el-select>
    <div class="text-xs text-primary-400 mt-2">
      <div class="">＊標籤設定最多 3 個，目前額度： 0/3</div>
      <div class="">＊標籤不能使用以下特殊符號：¥[]~' "/\#?,*+及空白</div>
    </div>
  </el-form-item>
</template>
