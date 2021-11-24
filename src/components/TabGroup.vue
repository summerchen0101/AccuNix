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
  <div class="flex space-x-2">
    <div
      v-for="(opt, i) in options"
      :key="i"
      class="tab"
      :class="value === opt.value && 'active'"
      @click="() => $emit('change', opt.value)"
    >
      {{ opt.label }}
    </div>
  </div>
</template>
