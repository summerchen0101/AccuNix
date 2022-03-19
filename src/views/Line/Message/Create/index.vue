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
              <ReviewWrapper v-for="(msg, i) in msgs" :key="i" :isActive="targetIndex === i" @click="targetIndex = i">
                <TextReview v-if="msg.type === MessageType.Text" :data="msg" />
                <BtnReview v-if="msg.type === MessageType.Button" :data="msg" />
              </ReviewWrapper>
            </div>
          </div>
          <PhoneCreateBtn />
        </PhoneFrame>
        <el-button class="mt-6">加入常用訊息</el-button>
      </div>
      <div class="flex-1">
        <TextEditor v-if="targetMsg.type === MessageType.Text" />
        <BtnEditor v-if="targetMsg.type === MessageType.Button" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import PhoneFrame from '@/components/PhoneFrame.vue'
import ReviewWrapper from '@/components/ReviewWrapper.vue'
import { MessageType } from '@/lib/enum'
import { useMsgStore } from '@/service/store/msgStore'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, ref, toRefs } from 'vue'
import BtnEditor from './components/editor/BtnEditor.vue'
import TextEditor from './components/editor/TextEditor.vue'
import PhoneCreateBtn from './components/PhoneCreateBtn.vue'
import BtnReview from './components/review/BtnReview.vue'
import TextReview from './components/review/TextReview.vue'
import TestSendBtn from './components/TestSendBtn.vue'

export default defineComponent({
  setup() {
    const nickname = ref('Summer')
    const { msgs, targetIndex, targetMsg } = storeToRefs(useMsgStore())

    return { nickname, targetIndex, msgs, MessageType, targetMsg }
  },
  components: {
    PhoneFrame,
    TextReview,
    ReviewWrapper,
    TestSendBtn,
    BtnReview,
    PhoneCreateBtn,
    TextEditor,
    BtnEditor,
  },
})
</script>
<style></style>
