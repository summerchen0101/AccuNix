<script lang="ts">
import { OptionType } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TabGroup',
  props: {
    value: [Number, String],
    options: Object as PropType<OptionType<number | string>[]>,
    onChange: Function as PropType<(value: number | string) => void>,
  },
  emits: ['change'],
})
</script>

<template>
  <div class="flex space-x-2 bg-gray-200 rounded-full p-1.5">
    <div
      v-for="(opt, i) in options"
      :key="i"
      class="
        w-36
        h-9
        flex
        items-center
        justify-center
        text-gray-500
        rounded-full
        cursor-pointer
        text-lg
      "
      :class="
        value === opt.value && 'bg-white text-primary-500 shadow-lg font-medium'
      "
      @click="() => $emit('change', opt.value)"
    >
      {{ opt.label }}
    </div>
  </div>
</template>
