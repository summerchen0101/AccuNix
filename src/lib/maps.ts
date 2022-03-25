import { MessageBtnAction, ProductType } from './enum'

export const orderTypeMap = {
  descending: 'desc',
  ascending: 'asc',
}
export const productTypeMap = {
  [ProductType.LINE]: 'LINE',
  [ProductType.FB]: 'FB',
}
export const productIconMap = {
  [ProductType.LINE]: 'fab fa-line',
  [ProductType.FB]: 'fab fa-facebook-square',
}
export const productApiPathMap = {
  [ProductType.LINE]: 'LINEBot',
  [ProductType.FB]: 'FBMessengerBot',
}

export const msgBtnActionMap = {
  [MessageBtnAction.Text]: '回覆文字',
  [MessageBtnAction.URL]: '開啟連結',
}
