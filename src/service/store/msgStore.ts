import { MessageType } from '@/lib/enum'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export interface LoginUser {
  id: number
  name: string
  picture: string
}

export interface TextMsg {
  type: MessageType.Text
  content: string
}

export interface BtnItem {
  label: string
  action: string
  message?: string
}

export interface BtnMsg {
  type: MessageType.Button
  reviewMsg: string
  title: string
  content: string
  btns: BtnItem[]
}

export type MessageItem = TextMsg | BtnMsg

export const useMsgStore = defineStore('msgStore', () => {
  const msgs = reactive<MessageItem[]>([
    { type: MessageType.Text, content: 'Lorem ipsum dolor sit, dolor, amet consectetur adipisicing' },
    {
      type: MessageType.Button,
      title: '測試的標題',
      reviewMsg: '',
      content: 'Lorem ipsum dolor sit, dolor, amet consectetur adipisicing',
      btns: [
        { label: '立即購買', action: 'Replay' },
        { label: '開啟網站', action: 'Link' },
      ],
    },
  ])

  const targetIndex = ref(0)

  const targetMsg = computed<MessageItem>({
    get: () => msgs[targetIndex.value],
    set: (data) => (msgs[targetIndex.value] = data),
  })

  const updateMsg = function <T extends MessageItem>(index: number, newMsg: T) {
    msgs[index] = newMsg
  }

  return {
    msgs,
    targetIndex,
    targetMsg,
    updateMsg,
  }
})
