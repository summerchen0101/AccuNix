<template>
  <h3 class="mb-4">文字</h3>
  <el-form :form="form" label-position="top">
    <el-form-item>
      <div class="flex items-center gap-2 relative mb-4">
        <div class="bg-gray-100 w-10 h-10 rounded-full"></div>
        <div class="text-sm text-gray-700">{{ nickname }}</div>
        <i class="fas fa-pen text-sm cursor-pointer" @click="isShowNicknameEditor = true"></i>
        <NicknameSetter v-model:visible="isShowNicknameEditor" v-model:name="nickname" />
      </div>
    </el-form-item>
    <el-form-item label="輸入文字">
      <MessageParams :params="{ name: '用戶名稱' }">
        <el-input type="textarea" :rows="3" v-model="form.content" />
      </MessageParams>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { TextMsg } from '@/service/store/msgStore'
import { computed, defineComponent, PropType, ref } from 'vue'
import MessageParams from '../MessageParams.vue'
import NicknameSetter from '../NicknameSetter.vue'

export default defineComponent({
  props: {
    targetMsg: Object as PropType<TextMsg>,
  },
  emits: ['update:targetMsg'],
  setup(props, { emit }) {
    const isShowNicknameEditor = ref(false)
    const nickname = ref('Summer')

    const form = computed<TextMsg>({
      get: () => props.targetMsg,
      set: (data) => emit('update:targetMsg', data),
    })

    return { isShowNicknameEditor, nickname, form }
  },
  components: { NicknameSetter, MessageParams },
})
</script>
<style></style>
