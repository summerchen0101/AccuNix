import { Module } from 'vuex'
import { RootState } from '..'
import actions, { actionCtrls } from './actions'
import mutations, { mutationCtrls } from './mutations'
import state, { BotState } from './state'

const moduleName = 'bot'

export const botModule: Module<BotState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export const botActions = actionCtrls(moduleName)
export const botMutations = mutationCtrls(moduleName)
