import { inject, provide, ref } from 'vue'

const state = {
  lineBotGuid: ref('5d8c6e29'),
}

export const useLineBotProvider = function () {
  provide('lineBot', state)
}

export const useLineBotState = function () {
  return inject<typeof state>('lineBot')
}
