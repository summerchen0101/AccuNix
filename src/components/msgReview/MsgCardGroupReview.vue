<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { MsgCardGroupFields } from '../types'

export default defineComponent({
  props: {
    data: Object as PropType<MsgCardGroupFields>,
  },
  setup(props) {
    const { review, groups } = toRefs(props.data)
    return { props, groups, review }
  },
})
</script>

<template>
  <div class="flex items-start space-x-3 overflow-x-auto">
    <div
      v-for="(g, i) in groups"
      :key="i"
      class="
        border border-gray-200
        rounded
        text-gray-600
        py-2
        px-2
        relative
        mt-1
        whitespace-pre-wrap
        break-words
        max-w-[calc(100%-3.5rem)]
        min-w-[160px]
      "
    >
      <img
        :src="g.imgRes?.path || 'https://fakeimg.pl/200x130/?text=Image'"
        class="rounded mb-1"
        alt=""
      />
      <div class="font-bold">{{ g.title }}</div>
      <div class="">{{ g.content }}</div>
      <div class="mt-2 space-y-2">
        <div
          v-for="(btn, i) in g.btns"
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
  </div>
</template>
