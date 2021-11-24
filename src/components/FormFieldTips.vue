<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      default: 'fas fa-info-circle',
    },
    content: String,
  },
  setup(props, { slots }) {
    return {}
  },
})
</script>

<template>
  <div class="flex space-x-2 items-center text-gray-500 leading-7">
    <i :class="iconClass"></i>
    <div>{{ content }}</div>
  </div>
</template>

<style scoped></style>
