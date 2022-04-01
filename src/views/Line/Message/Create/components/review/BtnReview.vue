<template>
  <div class="review-wrapper text-sm" :class="{ active }">
    <h5 class="text-sm mb-1">{{ data.title }}</h5>
    <div class="text-sm text-gray-400">{{ data.content }}</div>
    <div class="space-y-1.5 mt-3">
      <div v-for="(btn, i) in data.btns" :key="i" class="text-primary-400 text-center text-sm">
        {{ btn.label }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { BtnMsg } from '@/service/store/msgStore'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    active: Boolean,
    data: Object as PropType<BtnMsg>,
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
