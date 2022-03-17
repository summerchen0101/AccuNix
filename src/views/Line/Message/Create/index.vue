<template>
  <div class="p-3">
    <div class="text-xl text-gray-600 tracking-wider py-3">新增訊息</div>
    <div class="bg-white rounded-md shadow-md p-8 flex gap-x-10">
      <div class="flex flex-col items-center w-[300px]">
        <div class="flex justify-end w-full mb-3">
          <TestSendBtn />
        </div>
        <PhoneFrame>
          <div>
            <div class="flex gap-2 items-center mb-3">
              <div class="bg-gray-100 w-8 h-8 rounded-full"></div>
              <div class="text-sm text-gray-700">{{ nickname }}</div>
            </div>
            <div class="ml-6 space-y-2">
              <ReviewWrapper
                v-for="(msg, i) in messages"
                :key="i"
                :isActive="targetIndex === i"
                @click="targetIndex = i"
              >
                <TextReview v-if="msg.type === MessageType.Text" :content="msg.content" />
                <BtnReview
                  v-if="msg.type === MessageType.Button"
                  :title="msg.title"
                  :content="msg.content"
                  :btns="msg.btns"
                />
              </ReviewWrapper>
            </div>
          </div>
          <div class="border-t border-gray-400 relative mt-8">
            <div
              class="
                fas
                fa-plus-circle
                text-gray-400
                hover:text-primary-400
                absolute
                top-0
                left-0
                ml-[calc(50%-7px)]
                -mt-3.5
                bg-gray-200
                text-xl
                cursor-pointer
              "
              @click="isShowMsgTypeSelector = true"
            ></div>
          </div>
          <MsgTypeSelector v-model:visible="isShowMsgTypeSelector" v-model="msgType"
        /></PhoneFrame>
        <el-button class="mt-6">加入常用訊息</el-button>
      </div>
      <div class="flex-1">
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
          <el-form-item>
            <template #label>
              <div class="flex items-end justify-between">
                輸入文字 <MessageParams :params="{ name: '用戶名稱' }" />
              </div>
            </template>
            <el-input type="textarea" :rows="3" v-model="form.message" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import MsgTypeSelector from './components/MsgTypeSelector.vue'
import NicknameSetter from './components/NicknameSetter.vue'
import MessageParams from './components/MessageParams.vue'
import PhoneFrame from '@/components/PhoneFrame.vue'
import TextReview from './components/review/TextReview.vue'
import ReviewWrapper from '@/components/ReviewWrapper.vue'
import TestSendBtn from './components/TestSendBtn.vue'
import BtnReview, { BtnItem } from './components/review/BtnReview.vue'
import { MessageType } from '@/lib/enum'

export interface TextMsg {
  type: MessageType.Text
  content: string
}

export interface BtnMsg {
  type: MessageType.Button
  title: string
  content: string
  btns: BtnItem[]
}

export type MessageItem = TextMsg | BtnMsg

export default defineComponent({
  setup() {
    const msgType = ref('')
    const isShowMsgTypeSelector = ref(false)
    const isShowNicknameEditor = ref(false)
    const nickname = ref('Summer')
    const form = reactive({ message: '' })
    const targetIndex = ref(0)
    const messages = reactive<MessageItem[]>([
      { type: MessageType.Text, content: 'Lorem ipsum dolor sit, dolor, amet consectetur adipisicing' },
      {
        type: MessageType.Button,
        title: '測試的標題',
        content: 'Lorem ipsum dolor sit, dolor, amet consectetur adipisicing',
        btns: [
          { label: '立即購買', action: 'Replay' },
          { label: '開啟網站', action: 'Link' },
        ],
      },
    ])

    return { msgType, isShowMsgTypeSelector, isShowNicknameEditor, nickname, form, targetIndex, messages, MessageType }
  },
  components: {
    MsgTypeSelector,
    NicknameSetter,
    MessageParams,
    PhoneFrame,
    TextReview,
    ReviewWrapper,
    TestSendBtn,
    BtnReview,
  },
})
</script>
<style></style>
