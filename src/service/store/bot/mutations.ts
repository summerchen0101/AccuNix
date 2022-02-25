import { Bot, Organization } from '@/service/api/useLoginInfo'
import { MutationTree } from 'vuex'
import { BotState } from './state'
import { MutationTypes } from './types'
import { store } from '@/service/store'

export type BotMutations<S = BotState> = {
  [MutationTypes.SET_BOT](state: S, payload: Bot): void
  [MutationTypes.SET_ORG](state: S, payload: Bot): void
  [MutationTypes.SET_NAME](state: S, payload: string): void
}

const mutations: MutationTree<BotState> & BotMutations = {
  [MutationTypes.SET_BOT](state, bot) {
    state.botGuid = bot.GUID
  },
  [MutationTypes.SET_ORG](state, org: Organization) {
    state.orgGuid = org.GUID
  },
  [MutationTypes.SET_NAME](state, name) {
    state.name = name
  },
}

export const mutationCtrls = (moduleName: string) => {
  const toKey = (key: MutationTypes) => `${moduleName}/${key}`
  return {
    setBot: (bot: Bot) => store.commit(toKey(MutationTypes.SET_BOT), bot),
    setName: (name: string) => store.commit(toKey(MutationTypes.SET_NAME), name),
    setOrg: (org: Organization) => store.commit(toKey(MutationTypes.SET_ORG), org),
  }
}

export default mutations
