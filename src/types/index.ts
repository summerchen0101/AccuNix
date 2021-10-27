export interface OptionType<T = number | string> {
  label: string
  value: T
}

export interface ListBaseReq {
  sort?: string
  order?: string
  page?: number
  limit?: number
}

export interface ListMeta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}
