<script lang="tsx">
import { defineComponent, PropType, toRefs } from 'vue'
import { MsgImgFields } from '../types'

export default defineComponent({
  props: {
    data: Object as PropType<MsgImgFields>,
  },
  setup(props) {
    const { imgRes } = toRefs(props.data)
    return { imgRes }
  },
})
</script>

<template>
  <div :hidden="!imgRes?.path" class="mt-1 max-w-[calc(100%-3.5rem)]">
    <img :src="imgRes?.path" />
  </div>
</template>
