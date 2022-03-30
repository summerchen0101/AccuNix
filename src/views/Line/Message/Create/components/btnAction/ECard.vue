<template>
  <el-form-item label="選擇賀卡">
    <el-select v-model="form.cardGuid" placeholder="請選擇賀卡" class="w-full">
      <el-option v-for="n in 3" :value="n" :key="n">{{ n }}</el-option>
    </el-select>
  </el-form-item>
</template>
<script lang="ts">
import { BtnAction_ECard } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_ECard>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    const form = computed<BtnAction_ECard>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    return { form }
  },
})
</script>
<style lang=""></style>
