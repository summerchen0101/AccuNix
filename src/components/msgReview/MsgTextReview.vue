<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { MsgTextFields } from '../types'

export default defineComponent({
  props: {
    data: Object as PropType<MsgTextFields>,
  },
  setup(props) {
    const { content } = toRefs(props.data)
    return { content }
  },
})
</script>

<template>
  <div
    :hidden="!content"
    class="
      bg-gray-200
      rounded-xl
      text-gray-600
      py-1
      px-2
      relative
      mt-1
      whitespace-pre-wrap
      break-words
      msg-arrow
      max-w-[calc(100%-3.5rem)]
    "
  >
    {{ content }}
  </div>
</template>
