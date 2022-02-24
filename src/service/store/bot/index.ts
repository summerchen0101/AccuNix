import state, { BotState } from './state'
import mutations from './mutations'
import actions from './actions'
import { Module } from 'vuex'
import { store } from '..'
import { LoginInfoRes } from '@/service/api/useLoginInfo'
import { ActionTypes } from './types'

const createKey = (action: ActionTypes) => `bot/${action}`

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
