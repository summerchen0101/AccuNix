import { productApiPathMap } from '@/lib/maps'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Bot, LoginInfoRes, Organization } from '../api/useLoginInfo'

export interface LoginUser {
  id: number
  name: string
  picture: string
}

export const useBotStore = defineStore('botStore', () => {
  const bot = ref<Bot>()
  const org = ref<Organization>()
  const botList = ref<Bot[]>([])
  const user = ref<LoginUser>()

  const gotLoginInfo = (info: LoginInfoRes) => {
    org.value = info.organization
    botList.value = info.bots
    bot.value = info.bots[0]
    user.value = {
      id: info.id,
      name: info.name,
      picture: info.picture,
    }
  }
  const updateBot = (newBot: Bot) => {
    console.log(newBot)
    bot.value = newBot
  }
  return {
    bot,
    org,
    botList,
    user,

    orgGuid: computed(() => org.value?.GUID),
    botGuid: computed(() => bot.value?.GUID),
    botType: computed(() => bot.value?.product_type_id),
    botApiPath: computed(() => (bot.value ? `${productApiPathMap[bot.value.product_type_id]}/${bot.value.GUID}` : '')),

    gotLoginInfo,
    updateBot,
  }
})
// export const useBotStore = defineStore('botStore', {
//   state: (): BotState => ({
//     bot: null,
//     org: null,
//     botList: [],
//     user: null,
//   }),
//   getters: {
//     orgGuid: (state) => state.org.GUID,
//     botType: (state) => state.bot.product_type_id,
//     botGuid: (state) => state.bot.GUID,
//     botApiPath: (state) => (state.bot ? `${productApiPathMap[state.bot.product_type_id]}/${state.bot.GUID}` : ''),
//   },
//   actions: {
//     gotLoginInfo(info: LoginInfoRes) {
//       this.org = info.organization
//       this.user = {
//         id: info.id,
//         name: info.name,
//         picture: info.picture,
//       }
//       this.bot = info.bots[0]
//     },
//   },
// })
