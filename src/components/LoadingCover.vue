<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isLoading: Boolean,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="relative">
    <slot></slot>
    <div
      class="
        bg-white/50
        absolute
        top-0
        left-0
        w-full
        h-full
        flex
        justify-center
        items-center
        transition-all
      "
      :class="isLoading ? 'visible opacity-100' : 'opacity-0 invisible'"
    >
      <i class="fas fa-spinner fa-spin text-gray-800/20 fa-4x"></i>
    </div>
  </div>
</template>
