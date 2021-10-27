<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
export default defineComponent({
  name: 'CardPanel',
  emits: {
    setting: null,
  },
  props: {
    title: String,
    icon: String,
    desc: String,
  },
  setup(props, { slots }) {
    const { title, icon, desc } = toRefs(props)
    return {}
  },
})
</script>

<template>
  <div class="bg-white rounded-md p-4 shadow-md">
    <div class="flex items-center">
      <div class="flex-1 space-x-2 flex items-center">
        <i class="text-gray-400 text-xl" :class="icon"></i>
        <span class="text-lg text-gray-600 font-bold">{{ title }}</span>
      </div>
      <span
        class="
          bg-gray-200
          text-gray-500
          py-1
          px-3
          text-sm
          rounded-full
          cursor-pointer
        "
        @click="$emit('setting')"
      >
        設定
      </span>
    </div>
    <div class="text-gray-500 text-sm mt-3 pb-3">{{ desc }}</div>
    <slot></slot>
  </div>
</template>
