<script lang="ts">
import { OptionsType } from '@/types'
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
    const tags: OptionsType<number> = [
      { label: '標籤一', value: 1 },
      { label: '標籤二', value: 2 },
    ]
    return { tags }
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
    <el-form-item label="連結" required>
      <el-input
        :modelValue="formData.value"
        @update:modelValue="
          (val) => $emit('update:formData', { ...formData, value: val })
        "
      ></el-input>
    </el-form-item>
    <el-form-item label="標籤設定">
      <el-select
        :modelValue="formData.tags"
        @update:modelValue="
          (val) => $emit('update:formData', { ...formData, tags: val })
        "
        multiple
      >
        <el-option
          v-for="tag in tags"
          :key="tag.value"
          :label="tag.label"
          :value="tag.value"
        >
        </el-option
      ></el-select>
      <div class="text-xs text-blue-400 mt-2 leading-4">
        <div class="">＊標籤設定最多 3 個，目前額度： 0/3</div>
        <div class="">＊標籤不能使用以下特殊符號：¥[]~' "/\#?,*+及空白</div>
      </div>
    </el-form-item>
  </el-form>
</template>
