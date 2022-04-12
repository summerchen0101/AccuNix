<template>
  <div class="review-wrapper w-full h-40 p-2" :class="{ active }">
    <div class="bg-gray-200 h-full w-full">
      <video v-if="data.video" :src="data.video" alt="" class="h-full w-full object-cover" controls autoplay />
    </div>
  </div>
</template>
<script lang="ts">
import { VideoMsg } from '@/service/store/msgStore'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    active: Boolean,
    data: {
      type: Object as PropType<VideoMsg>,
      default: () => ({ video: '', img: '' } as VideoMsg),
    },
  },
  setup(props) {
    return {}
  },
})
</script>
<style></style>
