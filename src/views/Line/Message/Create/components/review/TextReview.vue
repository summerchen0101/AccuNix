<template>
  <div class="text-sm">
    {{ data.content }}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TextMsg } from '../../index.vue'

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
