import { TagOpt } from './../service/api/useTagOpts'
import { inject, provide, ref } from 'vue'

export interface BreadcrumbItem {
  name: string
  path?: string
  mobileShow?: boolean
}

const isShowTagPopup = ref(false)

const state = {
  breadcrumb: ref<BreadcrumbItem[]>([]),
  isShowTagPopup,
  tagOpts: ref<TagOpt[]>([]),
  tagTotal: ref<number>(0),
}

export const useGlobalProvider = function () {
  provide('global', state)
}

export const useGlobalState = function () {
  return inject<typeof state>('global')
}
