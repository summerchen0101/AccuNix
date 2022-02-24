import { LoginInfoRes } from '@/service/api/useLoginInfo'
import { ActionContext, ActionTree } from 'vuex'
import { botMutations } from '.'
import { BotState } from './state'
import { ActionTypes } from './types'

export type BotActions<S = BotState, R = {}> = {
  [ActionTypes.GOT_LOGIN_INFO]({ commit }: ActionContext<S, R>, payload: LoginInfoRes): void
  [ActionTypes.GOT_NAME]({ commit }: ActionContext<S, R>, payload: string): void
}

const actions: ActionTree<BotState, {}> & BotActions = {
  [ActionTypes.GOT_LOGIN_INFO](_, loginInfo) {
    botMutations.setBot(loginInfo.bots[0])
  },
  [ActionTypes.GOT_NAME](_, name) {
    botMutations.setName(name)
  },
}

export default actions
