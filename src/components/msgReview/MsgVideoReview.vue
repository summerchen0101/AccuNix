<script lang="tsx">
import { defineComponent, PropType, toRefs } from 'vue'
import { MsgVideoFields } from '../types'

export default defineComponent({
  props: {
    data: Object as PropType<MsgVideoFields>,
  },
  setup(props) {
    const { imgRes, videoRes } = toRefs(props.data)
    return { imgRes, videoRes }
  },
})
</script>

<template>
  <div
    v-if="videoRes?.path"
    class="mt-1 w-[calc(100%-3.5rem)] flex justify-center items-center"
  >
    <!-- <img :src="imgRes?.path" /> -->
    <video controls>
      <source :src="videoRes?.path" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>
