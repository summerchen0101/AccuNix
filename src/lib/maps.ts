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
  [MessageBtnAction.CommonMessage]: '發送常用訊息',
  [MessageBtnAction.RichMenu]: '切換主選單',
  [MessageBtnAction.Share]: '分享好友',
  [MessageBtnAction.OpenCoupon]: '開啟票券券夾',
  [MessageBtnAction.SendCoupon]: '發送票券活動',
  [MessageBtnAction.SendCoupons]: '發送票券券庫',
  [MessageBtnAction.MemberCenter]: '開啟會員中心',
  [MessageBtnAction.ECard]: '製作賀卡',
}
