<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Layout7',
  props: {
    isDemo: Boolean,
    activeBox: Number,
  },
  emits: ['update:activeBox'],
  setup() {
    const boxs = ref([...Array(3)].map((_, i) => i + 1))
    return { boxs }
  },
})
</script>

<template>
  <div class="grid grid-cols-6 grid-rows-3 h-full w-full border-box">
    <div
      v-for="t in boxs"
      :key="t"
      class="border-box col-span-6 p-1"
      :class="{ active: activeBox === t }"
      @click="$emit('update:activeBox', t)"
    >
      <span v-if="!isDemo">{{ t }}</span>
    </div>
  </div>
</template>
