<script lang="tsx">
import { defineComponent, PropType, toRefs } from 'vue'
import { MsgBtnFields } from '../types'

export default defineComponent({
  props: {
    data: Object as PropType<MsgBtnFields>,
  },
  setup(props) {
    const { title, content, review, btns } = toRefs(props.data)
    return { props, title, content, review, btns }
  },
})
</script>

<template>
  <div
    class="
      border border-gray-200
      rounded-xl
      text-gray-600
      py-2
      px-2
      relative
      mt-1
      whitespace-pre-wrap
      break-words
      msg-arrow
      max-w-[calc(100%-3.5rem)]
      w-full
    "
  >
    <div class="font-bold">{{ title }}</div>
    <div class="">{{ content }}</div>
    <div class="mt-2 space-y-2">
      <div
        v-for="(btn, i) in btns"
        :key="i"
        class="
          bg-gray-200
          rounded
          py-1
          px-2
          text-gray-500
          cursor-pointer
          hover:bg-gray-200/80
          text-center
        "
      >
        {{ btn.title }}
      </div>
    </div>
  </div>
</template>
