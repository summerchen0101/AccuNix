<template>
  <div class="text-sm">
    {{ data.content }}
  </div>
</template>
<script lang="ts">
import { TextMsg } from '@/service/store/msgStore'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<TextMsg>,
      default: () => ({ content: '' }),
    },
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
