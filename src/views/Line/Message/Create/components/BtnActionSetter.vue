<template>
  <div class="fixed h-full w-full top-0 left-0 z-30" @click="$emit('close')"></div>
  <div
    class="bg-white rounded-md shadow-md border border-gray-100 p-4 space-y-3 w-72 absolute -top-48 left-full z-40 ml-3"
  >
    <el-form-item label="按鈕名稱">
      <el-input v-model="form.label" placeholder="請輸入按鈕名稱" />
    </el-form-item>
    <el-form-item label="動作">
      <el-select v-model="form.action" placeholder="請選擇動作" class="w-full" />
    </el-form-item>
    <el-form-item label="回覆文字">
      <el-input v-model="form.message" placeholder="請輸入回覆文字" />
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="$emit('remove')" class="w-full">刪除</el-button>
    </el-form-item>
  </div>
</template>
<script lang="ts">
import { BtnItem } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    btn: Object as PropType<BtnItem>,
  },
  emits: ['update:btn', 'remove', 'close'],
  setup(props, { emit }) {
    // const form = reactive<BtnItem>({ label: '按鈕', action: '', message: '' })
    // const showSetter = ref(false)

    const form = computed<BtnItem>({
      get: () => props.btn,
      set: (data) => emit('update:btn', data),
    })
    return { form }
  },
})
</script>
<style lang=""></style>
