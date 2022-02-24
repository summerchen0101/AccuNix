import state, { BotState } from './state'
import mutations from './mutations'
import actions from './actions'
import { Module } from 'vuex'
import { RootState } from '..'

const botModule: Module<BotState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default botModule
