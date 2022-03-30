import { MessageBtnAction, MessageType } from '@/lib/enum'
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

export interface BtnAction_Text {
  action: MessageBtnAction.Text
  text: string
}
export interface BtnAction_URL {
  action: MessageBtnAction.URL
  original: boolean
  uri: string
  tags: string[]
}
export interface BtnAction_Share {
  action: MessageBtnAction.Share
  original: boolean
  uri: string
}
export interface BtnAction_CommonMessage {
  action: MessageBtnAction.CommonMessage
  messageGuid: string
  tags: string[]
}
export interface BtnAction_Richmenu {
  action: MessageBtnAction.Richmenu
  richmenuGuid: string
  tags: string[]
}
export interface BtnAction_Keyword {
  action: MessageBtnAction.Keyword
  text: string
}
export interface BtnAction_OpenCoupon {
  action: MessageBtnAction.OpenCoupon
  openWallet: boolean
  original: boolean
  uri: string
}
export interface BtnAction_SendCoupon {
  action: MessageBtnAction.SendCoupon
  campaignGuid: string
  original: boolean
  uri: string
}
export interface BtnAction_SendCoupons {
  action: MessageBtnAction.SendCoupons
  couponGuid: string
  original: boolean
  uri: string
}
export interface BtnAction_MemberCenter {
  action: MessageBtnAction.MemberCenter
  openMemberCenter: boolean
  original: boolean
  uri: string
}
export interface BtnAction_ECard {
  action: MessageBtnAction.ECard
  cardGuid: string
}

export type BtnAction = BtnAction_Text | BtnAction_URL

export type BtnItem = {
  label: string
  action: MessageBtnAction
  campaignGuid?: string
  couponGuid?: string
  richmenuGuid?: string
  messageGuid?: string
  openWallet?: boolean
  openMemberCenter?: boolean
  original?: boolean
  uri?: string
  text?: string
  cardGuid?: string
  tags?: string[]
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
        { label: '立即購買', action: MessageBtnAction.Text, text: '' },
        { label: '開啟網站', action: MessageBtnAction.URL, original: false, uri: '', tags: [] },
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

  const createMsg = (type: MessageType) => {
    switch (type) {
      case MessageType.Text:
        msgs.push({ type, content: '內容在這裡' })
        break
      case MessageType.Button:
        msgs.push({
          type,
          reviewMsg: '',
          title: '標題在這裡',
          content: '內容在這裡',
          btns: [{ label: '按鈕1', action: MessageBtnAction.Text, text: '' }],
        })
        break

      default:
        break
    }
    targetIndex.value = msgs.length - 1
  }

  const copyMsg = (msg: MessageItem, index: number) => {
    msgs.splice(index, 0, msg)
  }

  const removeMsg = (index: number) => {
    msgs.splice(index, 1)
    const newIndex = index - 1
    targetIndex.value = newIndex >= 0 ? newIndex : 0
  }

  return {
    msgs,
    targetIndex,
    targetMsg,
    createMsg,
    updateMsg,
    removeMsg,
    copyMsg,
  }
})
