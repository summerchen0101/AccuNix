import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { botActions, botModule } from './bot'

export const store = createStore<{}>({
  modules: {
    bot: botModule,
  },
})

export const vStore = {
  bot: botActions,
}

export const key: InjectionKey<Store<{}>> = Symbol()
