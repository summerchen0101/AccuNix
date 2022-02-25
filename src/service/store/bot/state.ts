export interface BotState {
  orgGuid: string
  botGuid: string
  name: string
}

const state = function (): BotState {
  return {
    orgGuid: '',
    botGuid: '',
    name: '',
  }
}

export default state
