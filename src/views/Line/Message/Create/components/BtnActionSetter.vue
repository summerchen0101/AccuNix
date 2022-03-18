<template>
  <div class="relative">
    <el-button
      :type="activeIndex === index && 'primary'"
      class="w-full relative z-40"
      @click="$emit('update:activeIndex', index)"
    >
      {{ form.name }}
    </el-button>

    <div :class="activeIndex === index ? 'block' : 'hidden'">
      <div class="fixed h-full w-full top-0 left-0 z-30" @click="onClose"></div>
      <div
        class="
          bg-white
          rounded-md
          shadow-md
          border border-gray-100
          p-4
          space-y-3
          w-72
          absolute
          -top-48
          left-full
          z-40
          ml-3
        "
      >
        <el-form-item label="按鈕名稱">
          <el-input v-model="form.name" placeholder="請輸入按鈕名稱" />
        </el-form-item>
        <el-form-item label="動作">
          <el-select v-model="form.action" placeholder="請選擇動作" class="w-full" />
        </el-form-item>
        <el-form-item label="回覆文字">
          <el-input v-model="form.replayContent" placeholder="請輸入回覆文字" />
        </el-form-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { number } from '@intlify/core-base'
import { defineComponent, PropType, reactive, ref } from 'vue'
import { BtnItem } from './review/BtnReview.vue'

export default defineComponent({
  props: {
    index: Number,
    data: Object as PropType<BtnItem>,
    activeIndex: Number,
  },
  emits: ['update:activeIndex', 'update:data'],
  setup(props, { emit }) {
    const form = reactive({ name: '按鈕', action: '', replayContent: '' })
    // const showSetter = ref(false)
    const onClose = () => {
      emit('update:activeIndex', null)
      emit('update:data', form)
    }
    return { form, onClose }
  },
})
</script>
<style lang=""></style>
