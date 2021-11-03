import { inject, provide, ref } from 'vue'

const state = {
  orgGuid: ref('5db11c59'),
  lineBotGuid: ref('5db13bab'),
}

export const useLineBotProvider = function () {
  provide('lineBot', state)
}

export const useLineBotState = function () {
  return inject<typeof state>('lineBot')
}
