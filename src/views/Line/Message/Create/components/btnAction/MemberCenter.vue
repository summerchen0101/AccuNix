<template>
  <template></template>
</template>
<script lang="ts">
import { BtnAction_OpenCoupon } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_OpenCoupon>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    const form = computed<BtnAction_OpenCoupon>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    return { form }
  },
})
</script>
<style lang=""></style>
