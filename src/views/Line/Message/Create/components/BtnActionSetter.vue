<template>
  <div class="relative">
    <el-button
      :type="activeIndex === index && 'primary'"
      class="w-full relative z-40"
      @click="$emit('update:activeIndex', index)"
    >
      {{ form.label }}
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
    </div>
  </div>
</template>
<script lang="ts">
import { number } from '@intlify/core-base'
import { defineComponent, PropType, reactive, ref, watch, watchEffect } from 'vue'
import { BtnItem } from './review/BtnReview.vue'

export default defineComponent({
  props: {
    index: Number,
    data: Object as PropType<BtnItem>,
    activeIndex: Number,
  },
  emits: ['update:activeIndex', 'update:data', 'remove'],
  setup(props, { emit }) {
    const form = reactive<BtnItem>({ label: '按鈕', action: '', message: '' })
    // const showSetter = ref(false)

    watchEffect(() => {
      form.label = props.data.label
      form.action = props.data.action
    })
    watch(
      () => props.activeIndex,
      (val) => {
        if (val !== props.index) {
          emit('update:data', form)
        }
      },
    )
    const onClose = () => {
      emit('update:activeIndex', null)
    }
    return { form, onClose }
  },
})
</script>
<style lang=""></style>
