<template>
  <div class="relative group">
    <div
      class="border-2 border-gray-300 bg-white rounded-md p-3 text-gray-500 cursor-pointer"
      :class="isActive ? 'border-primary-300' : ''"
    >
      <slot></slot>
    </div>
    <div class="absolute left-0 top-0 -ml-7 space-y-1 hidden group-hover:block">
      <div class="r-circle">
        <i class="far fa-arrows"></i>
      </div>
      <div class="r-circle">
        <i class="far fa-copy"></i>
      </div>
      <div class="r-circle">
        <i class="far fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isActive: Boolean,
  },
  setup(props) {
    return {}
  },
})
</script>
<style lang=""></style>
