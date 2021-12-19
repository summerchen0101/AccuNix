import { ProductType } from './enum'

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
