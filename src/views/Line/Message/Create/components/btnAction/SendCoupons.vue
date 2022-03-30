<template>
  <el-form-item>
    <template #label>
      選擇票券活動
      <span class="text-primary-400 ml-2">(券庫名稱：說明)</span>
    </template>
    <el-select v-model="form.uri" placeholder="請選擇票券活動" class="w-full">
      <el-option v-for="n in 3" :value="n" :key="n">{{ n }}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="選擇券庫">
    <el-select v-model="form.couponGuid" placeholder="請選擇券庫" class="w-full">
      <el-option v-for="n in 3" :value="n" :key="n">{{ n }}</el-option>
    </el-select>
  </el-form-item>
</template>
<script lang="ts">
import { BtnAction_SendCoupons } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_SendCoupons>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    const form = computed<BtnAction_SendCoupons>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    return { form }
  },
})
</script>
<style lang=""></style>
