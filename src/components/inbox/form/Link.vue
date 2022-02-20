<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import { TagOpt } from '@/service/api/useTagOpts'
import { ActionForm } from '@/views/inbox/Create.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formData: {
      type: Object as PropType<ActionForm>,
      default: () => ({
        type: 'uri',
        uri: '',
        original: false,
        tags: [],
      }),
    },
    tagOpts: {
      type: Array as PropType<TagOpt[]>,
      default: () => [],
    },
  },
  emits: ['update:formData'],
  setup(props) {
    const { isShowTagPopup } = useGlobalState()
    return { replaceStr: '{{user_token}}', isShowTagPopup }
  },
})
</script>

<template>
  <el-form-item required class="mb-0">
    <el-checkbox
      label="取消跳轉頁"
      :modelValue="formData.original"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, original: val })"
    ></el-checkbox>
  </el-form-item>
  <el-form-item label="連結" required>
    <el-input
      :modelValue="formData.uri"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, uri: val })"
    ></el-input>
    <div class="help">可使用 {{ replaceStr }} 替換 LINE 好友 userId</div>
  </el-form-item>
  <el-form-item>
    <template v-slot:label>
      <div class="flex items-center justify-between">
        <span>標籤設定</span>
        <el-button size="mini" type="warning" @click="isShowTagPopup = true">新增標籤 +</el-button>
      </div>
    </template>

    <el-select
      :modelValue="formData.tags"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, tags: val })"
      class="w-full"
      multiple
    >
      <el-option v-for="tag in tagOpts" :key="tag.id" :label="tag.name" :value="tag.id"> </el-option
    ></el-select>
    <div class="">
      <div class="help info">標籤設定最多 3 個，目前額度： {{ 3 - formData.tags.length }}/3</div>
      <div class="help info">標籤不能使用以下特殊符號： ¥[]~' "/\#?,*+及空白</div>
    </div>
  </el-form-item>
</template>
