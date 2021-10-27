<script lang="ts">
import { defineComponent, toRefs, computed, PropType } from 'vue'

type ColorTypes = 'danger' | 'success' | 'secondary'

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      default: 'fas fa-check',
    },
    color: {
      type: String as PropType<ColorTypes>,
      default: 'secondary',
    },
  },
  setup(props) {
    const colorClassMap: Record<ColorTypes, string> = {
      secondary: 'bg-gray-500 hover:bg-gray-400',
      danger: 'bg-red-500 hover:bg-red-400',
      success: 'bg-green-500 hover:bg-green-400',
    }
    return { colorClassMap }
  },
})
</script>

<template>
  <div
    class="
      text-white
      rounded-sm
      inline-flex
      items-center
      justify-center
      cursor-pointer
      h-8
      w-8
      text-sm
    "
    :class="colorClassMap[color]"
  >
    <i :class="iconClass"></i>
  </div>
</template>
