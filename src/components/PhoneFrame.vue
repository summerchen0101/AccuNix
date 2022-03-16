<template>
  <div class="bg-white border border-gray-50 shadow-xl rounded-3xl p-4 h-[580px] w-[300px] relative">
    <div class="bg-white rounded-lg h-8 w-36 absolute top-0 left-[calc(150px-4.5rem)]"></div>
    <div class="bg-gray-200 h-full rounded-3xl relative p-4">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    return {}
  },
})
</script>
<style></style>
