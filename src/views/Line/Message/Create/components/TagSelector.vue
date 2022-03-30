<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
    placeholder="請選擇標籤"
    class="w-full"
    multiple
    :multiple-limit="max"
  >
    <el-option v-for="opt in tagOpts" :key="opt.id" :label="opt.name" :value="opt.id" />
  </el-select>
  <p class="text-primary-400 leading-normal mt-1">
    標籤設定最多{{ max }}個，目前額度：{{ modelValue.length }}/{{ max }}
  </p>
  <div class="outline-btn" @click="isShowTagPopup = true">
    <i class="fas fa-plus mr-1"></i>
    <span>新增標籤</span>
  </div>
</template>
<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import useTagOpts from '@/service/api/useTagOpts'
import { defineComponent, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    max: {
      type: Number,
      default: 3,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const { isShowTagPopup } = useGlobalState()
    const { tagOpts, fetchData: fetchTagOpts } = useTagOpts()
    onMounted(() => {
      fetchTagOpts()
    })
    return {
      tagOpts,
      isShowTagPopup,
    }
  },
})
</script>
<style lang=""></style>
