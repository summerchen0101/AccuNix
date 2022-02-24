export interface BotState {
  botGuid: string
  name: string
}

const state = function (): BotState {
  return {
    botGuid: '',
    name: '',
  }
}

export default state
