import { ProductType } from '@/lib/enum'
import { productApiPathMap } from '@/lib/maps'
import { defineStore } from 'pinia'
import { Bot, LoginInfoRes } from '../api/useLoginInfo'

interface BotState {
  botGuid: string
  productType: ProductType
  loginInfo: LoginInfoRes | null
  botInfo: Bot | null
}

export const useBotStore = defineStore('botStore', {
  state: (): BotState => ({
    botGuid: '',
    productType: ProductType.LINE,
    loginInfo: null,
    botInfo: null,
  }),
  getters: {
    orgGuid: (state) => state.loginInfo.organization.GUID,
    botGuidWithType: (state) => `${state.productType}_${state.botGuid}`,
    botApiPath: (state) => (state.botGuid ? `${productApiPathMap[state.productType]}/${state.botGuid}` : ''),
  },
  actions: {
    onBotChange(botTypeStr: string) {
      // const [productType, botGuid] = botTypeStr.split('_')
      // this.$state.botGuid =
    },
    setLoginInfo(info: LoginInfoRes) {
      this.loginInfo = info
      this.botInfo = info.bots[0]
      this.botGuid = info.bots[0].GUID
      this.productType - info.bots[0].product_type_id
    },
  },
})
