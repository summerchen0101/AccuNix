import { Bot } from '@/service/api/useLoginInfo'
import { MutationTree } from 'vuex'
import { BotState } from './state'
import { MutationTypes } from './types'

export type BotMutations<S = BotState> = {
  [MutationTypes.SET_BOT](state: S, payload: Bot): void
  [MutationTypes.SET_NAME](state: S, payload: string): void
}

const mutations: MutationTree<BotState> & BotMutations = {
  [MutationTypes.SET_BOT](state, bot) {
    state.botGuid = bot.GUID
  },
  [MutationTypes.SET_NAME](state, name) {
    state.name = name
  },
}

export default mutations
