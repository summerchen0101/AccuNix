<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
    placeholder="請選擇標籤"
    class="w-full"
    multiple
  >
    <el-option v-for="opt in tagOpts" :key="opt.id" :label="opt.name" :value="opt.id" />
  </el-select>
  <p class="text-primary-400 leading-normal mt-1">標籤設定最多3個，目前額度：0/3</p>
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
      type: Array as PropType<number[]>,
      default: () => [],
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
