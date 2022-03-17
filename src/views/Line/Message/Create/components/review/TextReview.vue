<template>
  <div class="text-sm">
    {{ content }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    content: String,
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
