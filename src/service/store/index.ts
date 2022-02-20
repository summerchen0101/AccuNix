import { Organization } from '@/service/api/useLoginInfo'
import { InjectionKey } from 'vue'
import { createStore, MutationTree, Store, useStore as baseUseStore } from 'vuex'

// define your typings for the store state
export interface State {
  org: Organization | null
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export enum MutationTypes {
  SET_ORG = 'SET_ORG',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_ORG](state: S, payload: Organization): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ORG](state, org) {
    state.org = org
  },
}

export const store = createStore<State>({
  state: {
    org: null,
  },
  mutations,
})

export function useStore() {
  return baseUseStore(key)
}
