import { Organization } from '@/service/api/useLoginInfo'
import { InjectionKey } from 'vue'
import { createStore, MutationTree, Store, useStore as baseUseStore } from 'vuex'
import botModule from './bot'

// define your typings for the store state
export interface RootState {
  org: Organization | null
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

export enum MutationTypes {
  SET_ORG = 'SET_ORG',
}

export type Mutations<S = RootState> = {
  [MutationTypes.SET_ORG](state: S, payload: Organization): void
}

const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.SET_ORG](state, org) {
    state.org = org
  },
}

export const store = createStore<RootState>({
  state: {
    org: null,
  },
  mutations,
  modules: {
    bot: botModule,
  },
})

export function useStore() {
  return baseUseStore(key)
}
