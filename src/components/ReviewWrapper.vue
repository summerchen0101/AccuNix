<template>
  <div class="relative group">
    <div @click="$emit('select')">
      <slot></slot>
    </div>
    <div class="absolute -left-7 top-0 hidden group-hover:block pr-1">
      <div class="space-y-1">
        <div class="r-circle">
          <i class="fas fa-arrows-alt"></i>
        </div>
        <div class="r-circle" @click="$emit('copy')">
          <i class="far fa-copy"></i>
        </div>
        <div class="r-circle" @click="$emit('remove')">
          <i class="far fa-trash-alt"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['remove', 'select', 'copy'],
  setup(props) {
    return {}
  },
})
</script>
<style lang=""></style>
