<template>
  <div v-if="visible">
    <div class="fixed top-0 left-0 w-full h-full z-10" @click="$emit('update:visible', false)"></div>
    <div
      class="
        border border-gray-300
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
import { MessageType } from '@/lib/enum'
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
  },
  emits: ['update:visible', 'select'],
  setup(props, { emit }) {
    const options: Option<MessageType>[] = [
      { label: '文字', value: MessageType.Text, icon: 'fas fa-users' },
      { label: '按鈕', value: MessageType.Button, icon: 'fas fa-home' },
      { label: '圖片', value: MessageType.Image, icon: 'fas fa-users' },
      { label: '影片', value: MessageType.Video, icon: 'fas fa-users' },
      { label: '圖卡樣板', value: MessageType.Card, icon: 'fas fa-users' },
      { label: '圖片樣板', value: MessageType.ImageTpl, icon: 'fas fa-users' },
      { label: '進階圖片', value: MessageType.RichImage, icon: 'fas fa-users' },
      { label: '進階影片', value: MessageType.RichVideo, icon: 'fas fa-users' },
      {
        label: 'Flex Message',
        value: MessageType.Flex,
        icon: 'fas fa-users',
        subs: [
          { label: '按鈕', value: MessageType.FlexBtn },
          { label: '圖卡樣板', value: MessageType.FlexCard },
          { label: '圖片樣板', value: MessageType.FlexImage },
          { label: '自定義', value: MessageType.FlexCustom },
        ],
      },
    ]
    const handleSelected = (val: string) => {
      emit('select', val)
      emit('update:visible', false)
    }
    return { options, handleSelected }
  },
})
</script>
<style lang=""></style>
