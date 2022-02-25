import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { botActions, botModule } from './bot'
import { BotState } from './bot/state'

export interface RootState {
  bot: BotState
}

export const store = createStore<RootState>({
  modules: {
    bot: botModule,
  },
})

export const vStore = {
  bot: botActions,
}

export const key: InjectionKey<Store<RootState>> = Symbol()
