import { MessageType } from '@/lib/enum'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  title: string
  content: string
  btns: BtnItem[]
}

export type MessageItem = TextMsg | BtnMsg

export const useBotStore = defineStore('msgStore', () => {
  const msgs = ref<MessageItem[]>([])

  return {
    msgs,
  }
})
