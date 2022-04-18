<template>
  <div class="review-box text-sm" :class="{ active }">
    {{ data.content }}
  </div>
</template>
<script lang="ts">
import { TextMsg } from '@/service/store/msgStore'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    active: Boolean,
    data: {
      type: Object as PropType<TextMsg>,
      default: () => ({ content: '' }),
    },
  },
  emits: ['select'],
  setup(props) {
    return {}
  },
})
</script>
<style></style>
