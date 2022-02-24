import { Bot, LoginInfoRes } from '@/service/api/useLoginInfo'
import { ActionTree } from 'vuex'
import { RootState } from '..'
import { BotState } from './state'
import { ActionTypes, MutationTypes } from './types'

export type BotActions<S = BotState, R = RootState> = {
  [ActionTypes.GOT_LOGIN_INFO]({ commit }, payload: LoginInfoRes): void
  [ActionTypes.GOT_NAME]({ commit }, payload: string): void
}

const actions: ActionTree<BotState, RootState> & BotActions = {
  [ActionTypes.GOT_LOGIN_INFO]({ commit }, loginInfo) {
    commit(MutationTypes.SET_BOT, loginInfo.bots[0])
  },
  [ActionTypes.GOT_NAME]({ commit }, name) {
    commit(MutationTypes.SET_NAME, name)
  },
}

export default actions
