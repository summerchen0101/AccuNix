import { defineStore } from 'pinia'
import { LoginInfoRes } from '../api/useLoginInfo'

interface BotState {
  orgGuid: string
  botGuid: string
  name: string
}

export const useBotStore = defineStore('botStore', {
  state: (): BotState => ({
    orgGuid: '',
    botGuid: '',
    name: '',
  }),
  getters: {
    fullName: (state) => state.name + 'full',
  },
  actions: {
    gotName: (name: string) => {
      const state = this as BotState
      state.name = name
    },
    setLoginInfo: (info: LoginInfoRes) => {
      const state = this as BotState
      state.orgGuid = info.organization.GUID
      state.botGuid = info.bots[0].GUID
    },
  },
})
