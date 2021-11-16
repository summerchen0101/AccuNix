<script lang="ts">
import { OptionType } from '@/types'
import { ActionForm } from '@/views/inbox/Create.vue'
import { defineComponent, PropType } from 'vue'

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
    const friends: OptionType<number>[] = [
      { label: '機器人一', value: 1 },
      { label: '機器人二', value: 2 },
    ]
    return { friends }
  },
})
</script>

<template>
  <el-form-item required>
    <el-select
      :modelValue="formData.couponGuid"
      @update:modelValue="
        (val) => $emit('update:formData', { ...formData, value: val })
      "
      placeholder="選擇票券活動"
      ><el-option
        v-for="t in friends"
        :key="t.value"
        :label="t.label"
        :value="t.value"
      >
      </el-option
    ></el-select>
  </el-form-item>
</template>
