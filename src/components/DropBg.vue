<template>
  <div class="fixed top-0 left-0 h-full w-full" :hidden="!isOpen" @click="$emit('update:isOpen', !isOpen)"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: ['update:isOpen'],
})
</script>
