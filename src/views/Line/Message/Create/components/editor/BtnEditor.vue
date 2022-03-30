<template>
  <h3 class="mb-4">按鈕</h3>
  <el-form v-if="targetMsg.type === MessageType.Button" :form="form" label-position="top">
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
        <el-input v-model="form.reviewMsg" placeholder="請輸入預覽文字" />
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
            <div class="relative" v-for="(btn, i) in form.btns" :key="i">
              <el-button
                :type="activeBtnIndex === i ? 'primary' : undefined"
                class="w-full relative z-40"
                @click="activeBtnIndex = i"
              >
                {{ btn.label }}
              </el-button>
              <BtnActionSetter
                v-if="activeBtnIndex === i"
                v-model:btn="form.btns[i]"
                @remove="form.btns.splice(i, 1)"
                @close="activeBtnIndex = null"
              />
            </div>

            <el-button class="w-full border-dashed text-gray-400 relative z-50" @click="addBtn"> 增加按鈕 </el-button>
          </div>
        </el-form-item>
      </div>
    </el-form-item>
  </el-form>
  <TagCreatePopup />
</template>
<script lang="ts">
import { MessageBtnAction, MessageType } from '@/lib/enum'
import { BtnMsg } from '@/service/store/msgStore'
import { computed, defineComponent, PropType, ref } from 'vue'
import BtnActionSetter from '../BtnActionSetter.vue'
import MessageParams from '../MessageParams.vue'
import NicknameSetter from '../NicknameSetter.vue'
import TagCreatePopup from '../TagCreatePopup.vue'

export default defineComponent({
  props: {
    targetMsg: Object as PropType<BtnMsg>,
  },
  emits: ['update:targetMsg'],
  setup(props, { emit }) {
    const isShowNicknameEditor = ref(false)
    const nickname = ref('Summer')
    const form = computed<BtnMsg>({
      get: () => props.targetMsg,
      set: (data) => emit('update:targetMsg', data),
    })

    const activeBtnIndex = ref<number | null>(null)

    const addBtn = () => {
      form.value.btns.push({
        label: `按鈕${form.value.btns.length + 1}`,
        action: MessageBtnAction.Text,
        text: '',
      })
      activeBtnIndex.value = form.value.btns.length - 1
    }

    return { isShowNicknameEditor, nickname, activeBtnIndex, addBtn, form, MessageType }
  },
  components: { NicknameSetter, MessageParams, BtnActionSetter, TagCreatePopup },
})
</script>
<style></style>
