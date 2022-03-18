<template>
  <h3 class="mb-4">按鈕</h3>
  <el-form :form="form" label-position="top">
    <el-form-item>
      <div class="flex items-center gap-2 relative mb-4">
        <div class="bg-gray-100 w-10 h-10 rounded-full"></div>
        <div class="text-sm text-gray-700">{{ nickname }}</div>
        <i class="fas fa-pen text-sm cursor-pointer" @click="isShowNicknameEditor = true"></i>
        <NicknameSetter v-model:visible="isShowNicknameEditor" v-model:name="nickname" />
      </div>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div class="flex items-end">
          預覽訊息 <span class="text-gray-400 ml-1">(將顯示於推播通知及聊天列表中)</span>
        </div>
      </template>
      <MessageParams :params="{ name: '用戶名稱' }">
        <el-input v-model="form.reivewText" placeholder="請輸入預覽文字" />
      </MessageParams>
    </el-form-item>
    <el-form-item label="編輯按鈕" class="mt-6">
      <div class="bg-white rounded-md shadow-md border border-gray-100 p-4 space-y-3 w-72">
        <el-form-item>
          <MessageParams :params="{ name: '用戶名稱' }">
            <el-input v-model="form.title" placeholder="請輸入標題" />
          </MessageParams>
        </el-form-item>
        <el-form-item>
          <MessageParams :params="{ name: '用戶名稱' }">
            <el-input type="textarea" v-model="form.content" placeholder="請輸入內容" :rows="4" />
          </MessageParams>
        </el-form-item>
        <el-form-item>
          <div class="space-y-3">
            <BtnActionSetter
              v-for="(_, i) in btns"
              :key="i"
              v-model:btn="btns[i]"
              :index="i"
              v-model:activeIndex="activeBtn"
            />
            <el-button class="w-full border-dashed text-gray-400">增加按鈕</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import NicknameSetter from '../NicknameSetter.vue'
import MessageParams from '../MessageParams.vue'
import BtnActionSetter from '../BtnActionSetter.vue'
import { BtnItem } from '../review/BtnReview.vue'

export default defineComponent({
  setup(props) {
    const isShowNicknameEditor = ref(false)
    const nickname = ref('Summer')
    const form = reactive({ reivewText: '', title: '', content: '' })
    const activeBtn = ref<number | null>(null)
    const btns = ref<BtnItem[]>([
      { label: '按鈕1', action: '' },
      { label: '按鈕2', action: '' },
    ])

    return { isShowNicknameEditor, nickname, form, activeBtn, btns }
  },
  components: { NicknameSetter, MessageParams, BtnActionSetter },
})
</script>
<style></style>
