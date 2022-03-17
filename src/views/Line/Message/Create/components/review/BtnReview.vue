<template>
  <div>
    <h5 class="text-sm mb-1">{{ title }}</h5>
    <div class="text-sm text-gray-400">{{ content }}</div>
    <div class="space-y-1.5 mt-3">
      <div v-for="(btn, i) in btns" :key="i" class="text-primary-400 text-center text-sm">
        {{ btn.label }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface BtnItem {
  label: string
  action: string
}

export default defineComponent({
  props: {
    title: String,
    content: String,
    btns: Array as PropType<BtnItem[]>,
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
