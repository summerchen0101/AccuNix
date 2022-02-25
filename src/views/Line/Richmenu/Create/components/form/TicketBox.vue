<script lang="ts">
import { OptionType } from '@/types'
import { ActionForm } from '@/views/Line/Richmenu/Create/index.vue'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    formData: {
      type: Object as PropType<ActionForm>,
      default: () => ({
        type: 'coupon',
        couponGuid: '',
      }),
    },
  },
  emits: ['update:formData'],
  setup(props) {
    const activity = ref(1)
    const activitys: OptionType<number>[] = [
      { label: '愛酷歡慶春節(1)', value: 1 },
      { label: '愛酷虎年賀吉祥(2)', value: 2 },
    ]
    const ticketsMap: Record<number, OptionType<number>[]> = {
      1: [{ label: '券A折10元 可轉贈', value: 1 }],
      2: [
        { label: '喜糖一顆', value: 2 },
        { label: '牛奶糖一顆', value: 3 },
      ],
    }
    return { activity, activitys, ticketsMap }
  },
})
</script>

<template>
  <el-form-item required label="票券活動">
    <el-select class="w-full" placeholder="選擇票券活動" v-model="activity"
      ><el-option v-for="t in activitys" :key="t.value" :label="t.label" :value="t.value"> </el-option
    ></el-select>
  </el-form-item>
  <el-form-item required label="活動券庫">
    <el-select
      :modelValue="formData.couponGuid"
      class="w-full"
      @update:modelValue="(val) => $emit('update:formData', { ...formData, couponGuid: val })"
      placeholder="選擇活動券庫"
      ><el-option v-for="t in ticketsMap[activity]" :key="t.value" :label="t.label" :value="t.value"> </el-option
    ></el-select>
  </el-form-item>
</template>
