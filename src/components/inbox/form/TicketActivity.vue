<script lang="ts">
import { OptionType } from '@/types'
import { ActionForm } from '@/views/richmenu/Create.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formData: {
      type: Object as PropType<ActionForm>,
      default: () => ({
        type: 'coupon',
        campaignGuid: '',
      }),
    },
  },
  emits: ['update:formData'],
  setup(props) {
    const activitys: OptionType<number>[] = [
      { label: '愛酷歡慶春節(1)', value: 1 },
      { label: '愛酷虎年賀吉祥(2)', value: 2 },
    ]
    return { activitys }
  },
})
</script>

<template>
  <el-form-item required>
    <el-select
      :modelValue="formData.campaignGuid"
      class="w-full"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, campaignGuid: val })"
      placeholder="選擇票券活動"
      ><el-option v-for="t in activitys" :key="t.value" :label="t.label" :value="t.value"> </el-option
    ></el-select>
  </el-form-item>
</template>
