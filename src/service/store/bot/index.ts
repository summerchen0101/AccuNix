import state, { BotState } from './state'
import mutations from './mutations'
import actions from './actions'
import { Module, Commit } from 'vuex'
import { store } from '..'
import { Bot, LoginInfoRes } from '@/service/api/useLoginInfo'
import { ActionTypes, MutationTypes } from './types'

const createKey = (key: ActionTypes | MutationTypes) => `bot/${key}`

export const botModule: Module<BotState, {}> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export const botActions = {
  gotName: (name: string) => store.dispatch(createKey(ActionTypes.GOT_NAME), name),
  setLoginInfo: (loginInfo: LoginInfoRes) => store.dispatch(createKey(ActionTypes.GOT_LOGIN_INFO), loginInfo),
}

export const botMutations = {
  setBot: (bot: Bot) => store.commit(createKey(MutationTypes.SET_BOT), bot),
  setName: (name: string) => store.commit(createKey(MutationTypes.SET_NAME), name),
}
