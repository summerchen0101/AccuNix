<template>
  <div class="review-wrapper w-40 h-40 p-2" :class="{ active }">
    <div class="bg-gray-200 h-full w-full">
      <img v-if="data.img" :src="data.img" alt="" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
<script lang="ts">
import { ImgMsg } from '@/service/store/msgStore'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    active: Boolean,
    data: {
      type: Object as PropType<ImgMsg>,
      default: () => ({ content: '' }),
    },
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
