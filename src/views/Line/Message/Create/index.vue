<template>
  <div class="p-3">
    <div class="text-xl text-gray-600 tracking-wider py-3">新增訊息</div>
    <div class="bg-white rounded-md shadow-md p-8 flex gap-x-16">
      <div class="flex flex-col items-center w-[350px]">
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
                v-for="(msg, i) in msgs"
                :key="i"
                @remove="handleRemove(i)"
                @copy="handleCopy(msg, i)"
                @select="targetIndex = i"
              >
                <component :is="reiviewMap[msg.type]" :active="targetIndex === i" :data="msg" />
              </ReviewWrapper>
            </div>
          </div>

          <PhoneCreateBtn @select="handleCreate" />
        </PhoneFrame>
        <el-button class="mt-4">加入常用訊息</el-button>
      </div>
      <div class="flex-1">
        <component :is="editorMap[targetMsg.type]" v-model:targetMsg="targetMsg" />
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
import { defineComponent, ref } from 'vue'
import BtnEditor from './components/editor/BtnEditor.vue'
import TextEditor from './components/editor/TextEditor.vue'
import ImgEditor from './components/editor/ImgEditor.vue'
import PhoneCreateBtn from './components/PhoneCreateBtn.vue'
import BtnReview from './components/review/BtnReview.vue'
import TextReview from './components/review/TextReview.vue'
import ImgReview from './components/review/ImgReview.vue'
import TestSendBtn from './components/TestSendBtn.vue'
import VideoReview from './components/review/VideoReview.vue'
import VideoEditor from './components/editor/VideoEditor.vue'
import CardEditor from './components/editor/CardEditor.vue'
import CardReview from './components/review/CardReview.vue'

export default defineComponent({
  setup() {
    const nickname = ref('Summer')
    const msgStore = useMsgStore()

    const { msgs, targetIndex, targetMsg } = storeToRefs(useMsgStore())

    const reiviewMap = {
      [MessageType.Text]: TextReview,
      [MessageType.Button]: BtnReview,
      [MessageType.Image]: ImgReview,
      [MessageType.Video]: VideoReview,
      [MessageType.Card]: CardReview,
    }
    const editorMap = {
      [MessageType.Text]: TextEditor,
      [MessageType.Button]: BtnEditor,
      [MessageType.Image]: ImgEditor,
      [MessageType.Video]: VideoEditor,
      [MessageType.Card]: CardEditor,
    }

    return {
      nickname,
      targetIndex,
      msgs,
      MessageType,
      targetMsg,
      handleCreate: msgStore.createMsg,
      handleRemove: msgStore.removeMsg,
      handleCopy: msgStore.copyMsg,
      reiviewMap,
      editorMap,
    }
  },
  components: {
    PhoneFrame,
    ImgReview,
    TextReview,
    ReviewWrapper,
    TestSendBtn,
    BtnReview,
    PhoneCreateBtn,
    TextEditor,
    BtnEditor,
    ImgEditor,
  },
})
</script>
<style></style>
