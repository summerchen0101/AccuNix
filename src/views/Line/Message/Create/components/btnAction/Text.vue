<template>
  <el-form-item label="回覆文字">
    <el-input v-model="form.message" placeholder="請輸入回覆文字" />
  </el-form-item>
</template>
<script lang="ts">
import { BtnAction_Text, BtnItem } from '@/service/store/msgStore'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_Text>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    // const form = reactive<BtnItem>({ label: '按鈕', action: '', message: '' })
    // const showSetter = ref(false)

    const form = computed<BtnAction_Text>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    return { form }
  },
})
</script>
<style lang=""></style>
