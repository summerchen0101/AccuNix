export interface Btn {
  title: string
  action: number
  reply: string
}
export interface MsgTextFields {
  content: string
}
export interface MsgBtnFields {
  review: string
  title: string
  content: string
  btns: Btn[]
}
export const name = 'summer'
