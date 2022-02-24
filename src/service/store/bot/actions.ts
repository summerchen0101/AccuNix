import { LoginInfoRes } from '@/service/api/useLoginInfo'
import { ActionTree, ActionContext } from 'vuex'
import { BotState } from './state'
import { ActionTypes, MutationTypes } from './types'

export type BotActions<S = BotState, R = {}> = {
  [ActionTypes.GOT_LOGIN_INFO]({ commit }: ActionContext<S, R>, payload: LoginInfoRes): void
  [ActionTypes.GOT_NAME]({ commit }: ActionContext<S, R>, payload: string): void
}

const actions: ActionTree<BotState, {}> & BotActions = {
  [ActionTypes.GOT_LOGIN_INFO]({ commit }, loginInfo) {
    commit(MutationTypes.SET_BOT, loginInfo.bots[0])
  },
  [ActionTypes.GOT_NAME]({ commit }, name) {
    commit(MutationTypes.SET_NAME, name)
  },
}

export default actions
