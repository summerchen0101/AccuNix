<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { MsgBtnFields } from '../types'

export default defineComponent({
  props: {
    form: {
      type: Object as PropType<MsgBtnFields>,
      default: () =>
        ({
          review: '',
          title: '',
          content: '',
          btns: [],
        } as MsgBtnFields),
    },
  },
  emits: ['update:form'],
  setup(props, { emit }) {
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
    <el-form-item label="預覽訊息">
      <el-input placeholder="请输入預覽訊息" v-model="formData.review" />
      <p class="text-gray-400">（預覽訊息將顯示於推播通知及聊天列表中）</p>
    </el-form-item>
    <el-form-item label="標題">
      <el-input placeholder="请输入標題" v-model="formData.title" />
    </el-form-item>
    <el-form-item label="內容">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="formData.content"
        maxlength="100"
        show-word-limit
      />
    </el-form-item>
    <template v-for="(btn, i) in formData.btns" :key="i">
      <el-form-item label="按鈕標題">
        <el-input placeholder="请输入按鈕標題" v-model="btn.title" />
      </el-form-item>
      <el-form-item label="按鈕動作">
        <el-select placeholder="请選擇" v-model="btn.action" />
      </el-form-item>
      <el-form-item label="按鈕回覆文字">
        <el-input placeholder="请输入按鈕回覆文字" v-model="btn.reply" />
      </el-form-item>
    </template>
  </el-form>
</template>
