<template>
  <div class="border-t border-gray-400 relative mt-8">
    <div
      class="
        fas
        fa-plus-circle
        text-gray-400
        hover:text-primary-400
        absolute
        top-0
        left-0
        ml-[calc(50%-7px)]
        -mt-3.5
        bg-gray-200
        text-xl
        cursor-pointer
      "
      @click="isShowMsgTypeSelector = true"
    ></div>
  </div>
  <MsgTypeSelector v-model:visible="isShowMsgTypeSelector" @select="(val) => $emit('select', val)" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MsgTypeSelector from './MsgTypeSelector.vue'

export default defineComponent({
  emits: ['select'],
  setup(props, { emit }) {
    const msgType = ref('')
    const isShowMsgTypeSelector = ref(false)

    return { msgType, isShowMsgTypeSelector }
  },
  components: { MsgTypeSelector },
})
</script>
<style lang=""></style>
