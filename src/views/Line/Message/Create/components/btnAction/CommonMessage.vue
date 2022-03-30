<template>
  <el-form-item label="選擇常用訊息">
    <el-select v-model="form.messageGuid" placeholder="請選擇常用訊息" class="w-full">
      <el-option v-for="n in 3" :value="n" :key="n">{{ n }}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="按鈕標籤設定">
    <TagSelector v-model="form.tags" />
  </el-form-item>
</template>
<script lang="ts">
import { BtnAction_CommonMessage } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'
import TagSelector from '../TagSelector.vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_CommonMessage>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    const form = computed<BtnAction_CommonMessage>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    return { form }
  },
  components: { TagSelector },
})
</script>
<style lang=""></style>
