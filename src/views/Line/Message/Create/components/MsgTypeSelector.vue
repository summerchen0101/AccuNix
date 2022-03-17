<template>
  <div v-if="visible" class="">
    <div class="fixed top-0 left-0 w-full h-full" @click="$emit('update:visible', false)"></div>
    <div
      class="
        border border-primary-300
        rounded-xl
        p-6
        grid grid-cols-5
        gap-y-6 gap-x-2
        bg-white
        shadow-lg
        absolute
        top-0
        left-0
        mt-32
        -ml-8
        w-max
        z-10
      "
    >
      <div
        v-for="(opt, i) in options"
        @click="handleSelected(opt.value)"
        :key="i"
        class="flex flex-col items-center gap-1 relative cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <i class="text-gray-400 text-xl" :class="opt.icon"></i>
        </div>
        <div class="text-gray-600 text-sm">{{ opt.label }}</div>
        <div
          v-if="opt.subs"
          class="
            bg-white
            shadow-md
            rounded-lg
            p-2
            space-y-1
            absolute
            left-0
            top-0
            ml-20
            w-max
            border border-gray-50
            hidden
            group-hover:block
            text-sm text-gray-700
            z-10
          "
        >
          <div
            v-for="(sub, sub_i) in opt.subs"
            :key="sub_i"
            class="px-3 hover:bg-primary-100 cursor-pointer"
            @click.stop="handleSelected(sub.value)"
          >
            {{ sub.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

interface Option<T> {
  label: string
  value: T
  icon?: string
  subs?: Option<T>[]
}

export default defineComponent({
  props: {
    visible: Boolean,
    modelValue: String,
  },
  emits: ['update:visible', 'update:modelValue'],
  setup(props, { emit }) {
    const options: Option<string>[] = [
      { label: '文字', value: 'text', icon: 'fas fa-users' },
      { label: '按鈕', value: 'btn', icon: 'fas fa-home' },
      { label: '圖片', value: 'img', icon: 'fas fa-users' },
      { label: '影片', value: 'video', icon: 'fas fa-users' },
      { label: '圖卡樣板', value: 'card', icon: 'fas fa-users' },
      { label: '圖片樣板', value: 'img-tpl', icon: 'fas fa-users' },
      { label: '進階圖片', value: 'advance-img', icon: 'fas fa-users' },
      { label: '進階影片', value: 'advance-video', icon: 'fas fa-users' },
      {
        label: 'Flex Message',
        value: 'flex',
        icon: 'fas fa-users',
        subs: [
          { label: '按鈕', value: 'flex-btn' },
          { label: '圖卡樣板', value: 'flex-card' },
          { label: '圖片樣板', value: 'flex-img-tpl' },
          { label: '自定義', value: 'flex-custom' },
        ],
      },
    ]
    const handleSelected = (val: string) => {
      emit('update:modelValue', val)
      emit('update:visible', false)
    }
    return { options, handleSelected }
  },
})
</script>
<style lang=""></style>
