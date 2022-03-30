<template>
  <el-form-item>
    <template #label>
      按鈕開啟連結
      <el-checkbox class="float-right text-red-400" label="取消轉跳頁" />
    </template>
    <el-input v-model="form.uri" placeholder="請輸入URL" />
    <div class="text-primary-400 leading-relaxed mt-2">
      <CopyTextBtn text="{{user_token}}" />
      在連結網頁中識別好友id
    </div>
  </el-form-item>
  <el-form-item label="按鈕標籤設定">
    <TagSelector v-model="form.tags" />
  </el-form-item>
</template>
<script lang="ts">
import useTagOpts from '@/service/api/useTagOpts'
import { BtnAction_URL } from '@/service/store/msgStore'
import { computed, defineComponent, onMounted, PropType, watchEffect } from 'vue'
import TagSelector from '../TagSelector.vue'
import CopyTextBtn from '@/components/CopyTextBtn.vue'

export default defineComponent({
  props: {
    data: Object as PropType<BtnAction_URL>,
  },
  emits: ['update:data', 'remove', 'close'],
  setup(props, { emit }) {
    const form = computed<BtnAction_URL>({
      get: () => props.data,
      set: (data) => emit('update:data', data),
    })
    const { tagOpts, fetchData: fetchTagOpts } = useTagOpts()

    onMounted(() => {
      fetchTagOpts()
    })
    return { form, tagOpts }
  },
  components: { TagSelector, CopyTextBtn },
})
</script>
<style lang=""></style>
