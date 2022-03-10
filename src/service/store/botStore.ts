import { productApiPathMap } from '@/lib/maps'
import { defineStore } from 'pinia'
import { Bot, LoginInfoRes, Organization } from '../api/useLoginInfo'

interface LoginUser {
  id: number
  name: string
  picture: string
}
interface BotState {
  bot: Bot | null
  org: Organization | null
  botList: Bot[]
  user: LoginUser | null
}

export const useBotStore = defineStore('botStore', {
  state: (): BotState => ({
    bot: null,
    org: null,
    botList: [],
    user: null,
  }),
  getters: {
    orgGuid: (state) => state.org.GUID,
    botType: (state) => state.bot.product_type_id,
    botGuid: (state) => state.bot.GUID,
    botApiPath: (state) => (state.bot ? `${productApiPathMap[state.bot.product_type_id]}/${state.bot.GUID}` : ''),
  },
  actions: {
    gotLoginInfo(info: LoginInfoRes) {
      this.org = info.organization
      this.user = {
        id: info.id,
        name: info.name,
        picture: info.picture,
      }
      this.bot = info.bots[0]
    },
  },
})
