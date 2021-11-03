<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Layout12',
  props: {
    isDemo: Boolean,
    activeBox: Number,
  },
  emits: ['update:activeBox'],
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="grid grid-cols-1 h-full w-full border-box">
    <div
      class="border-box p-1"
      :class="{ active: activeBox === 1 }"
      @click="$emit('update:activeBox', 1)"
    >
      <span v-if="!isDemo">1</span>
    </div>
  </div>
</template>
