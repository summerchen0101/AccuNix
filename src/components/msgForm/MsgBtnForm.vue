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
          btns: [{ title: '', action: 1, reply: '' }],
        } as MsgBtnFields),
    },
  },
  emits: ['update:form'],
  setup(props, { emit }) {
    const formData = computed({
      get: () => props.form,
      set: (val) => emit('update:form', val),
    })
    const handleBtnCreate = () => {
      formData.value.btns.push({ title: '按鈕', action: 1, reply: '' })
    }
    const handleBtnClose = (index: number) => {
      formData.value.btns.splice(index, 1)
    }
    return { formData, handleBtnCreate, handleBtnClose }
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
    <div
      v-for="(btn, i) in formData.btns"
      :key="i"
      class="bg-gray-100 p-3 relative mx-2 mb-5"
    >
      <div
        class="
          absolute
          top-0
          left-0
          rounded-full
          bg-gray-400
          text-white
          w-6
          h-6
          text-center
          -m-2
        "
      >
        {{ i + 1 }}
      </div>
      <div
        :hidden="formData.btns.length <= 1"
        class="
          absolute
          top-0
          right-0
          rounded-full
          bg-red-400
          text-white
          w-6
          h-6
          text-center
          -m-2
          cursor-pointer
        "
        @click="() => handleBtnClose(i)"
      >
        <i class="fas fa-times"></i>
      </div>
      <el-form-item label="按鈕標題">
        <el-input placeholder="请输入按鈕標題" v-model="btn.title" />
      </el-form-item>
      <el-form-item label="按鈕動作">
        <el-select placeholder="请選擇" v-model="btn.action" />
      </el-form-item>
      <el-form-item label="按鈕回覆文字">
        <el-input placeholder="请输入按鈕回覆文字" v-model="btn.reply" />
      </el-form-item>
    </div>
    <div class="mb-5">
      <button
        class="
          bg-gray-400
          py-1
          px-2
          rounded
          text-sm text-white
          hover:bg-gray-400/80
        "
        type="button"
        @click="handleBtnCreate"
      >
        <i class="fas fa-plus"></i> 增加按鈕
      </button>
    </div>
  </el-form>
</template>
