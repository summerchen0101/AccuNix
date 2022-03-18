<template>
  <div :tabindex="1" @focus.capture="onFocus" @blur.capture="onBlur">
    <slot></slot>
  </div>
  <div class="absolute top-0 right-0 mr-2 message-params transition-all">
    <div class="relative group inline-block">
      <div
        class="
          bg-white
          shadow-sm
          border border-gray-200
          rounded-full
          w-7
          h-7
          grid
          place-content-center
          text-gray-500
          cursor-pointer
        "
      >
        { }
      </div>
      <div
        class="
          absolute
          top-0
          left-0
          bg-white
          border border-gray-50
          shadow-lg
          rounded-md
          z-10
          p-3
          -ml-32
          mt-9
          w-48
          hidden
          group-hover:block
          leading-normal
          text-sm
        "
      >
        <div>選擇參數</div>
        <div v-for="{ label, code } in fixedParams" :key="code" class="flex gap-3 items-center py-1 mt-1">
          <div class="text-gray-400">{{ label }}</div>
          <div class="bg-primary-400 text-white p-0.5 px-1 rounded">{{ code }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    params: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
  },
  setup(props) {
    const fixedParams = computed(() =>
      Object.entries(props.params).map(([code, label]) => ({ label, code: `{{${code}}}` })),
    )
    const onFocus = (e: FocusEvent) => {
      ;((e.target as Element).closest('.el-form-item') as Element)
        .querySelector('.message-params')
        .classList.add('-mr-9')
    }
    const onBlur = (e: FocusEvent) => {
      ;((e.target as Element).closest('.el-form-item') as Element)
        .querySelector('.message-params')
        .classList.remove('-mr-9')
    }
    return { fixedParams, onFocus, onBlur }
  },
})
</script>
<style lang=""></style>
