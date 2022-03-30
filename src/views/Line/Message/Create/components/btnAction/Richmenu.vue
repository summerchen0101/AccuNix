<template>
  <el-form-item label="選擇主選單">
    <el-select v-model="form.richmenuGuid" placeholder="請選擇主選單" class="w-full">
      <el-option v-for="n in 3" :value="n" :key="n">{{ n }}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="按鈕標籤設定">
    <TagSelector v-model="form.tags" />
  </el-form-item>
</template>
<script lang="ts">
import { BtnAction_Richmenu } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'
import TagSelector from '../TagSelector.vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_Richmenu>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    const form = computed<BtnAction_Richmenu>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    return { form }
  },
  components: { TagSelector },
})
</script>
<style lang=""></style>
