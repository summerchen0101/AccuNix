import { inject, provide, ref } from 'vue'

const state = {
  orgGuid: ref('5db11c59'),
  lineBotGuid: ref('5db13bab'),
  fbBotGuid: ref('5db2af62'),
}

export const useGlobalProvider = function () {
  provide('global', state)
}

export const useGlobalState = function () {
  return inject<typeof state>('global')
}
