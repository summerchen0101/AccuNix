<script lang="ts">
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'SectionPanel',
  props: {
    title: String,
    icon: String,
  },
  setup(props, { slots }) {
    const { title, icon } = toRefs(props)

    return {}
  },
})
</script>

<template>
  <div class="bg-white rounded-md p-4 shadow-md min-h-[300px]">
    <div class="flex items-center">
      <div class="flex-1 flex items-center">
        <i class="text-gray-400 text-xl" :class="icon"></i>
        <span class="text-lg text-gray-600 font-bold">{{ title }}</span>
      </div>
      <slot name="plus"></slot>
    </div>
    <slot></slot>
    <div class="border-t border-gray-200 -mx-2 px-4 pt-3">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
