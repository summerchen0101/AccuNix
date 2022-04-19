<template>
  <div class="overflow-x-auto whitespace-nowrap space-x-2 pb-5">
    <div v-for="(card, c_i) in data.cards" :key="c_i" class="review-box text-sm w-44 inline-block" :class="{ active }">
      <h5 class="text-sm mb-1">{{ card.title }}</h5>
      <div class="text-sm text-gray-400">{{ card.content }}</div>
      <div class="space-y-1.5 mt-3">
        <div v-for="(btn, b_i) in card.btns" :key="b_i" class="text-primary-400 text-center text-sm">
          {{ btn.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { CardMsg } from '@/service/store/msgStore'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    active: Boolean,
    data: Object as PropType<CardMsg>,
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
