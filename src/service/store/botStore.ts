import { defineStore } from 'pinia'
import { LoginInfoRes } from '../api/useLoginInfo'

interface BotState {
  orgGuid: string
  botGuid: string
}

export const useBotStore = defineStore('botStore', {
  state: (): BotState => ({
    orgGuid: '',
    botGuid: '',
  }),
  actions: {
    setLoginInfo(info: LoginInfoRes) {
      const state = this as BotState
      state.orgGuid = info.organization.GUID
      state.botGuid = info.bots[0].GUID
    },
  },
})
