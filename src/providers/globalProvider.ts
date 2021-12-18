import { LoginInfoRes } from './../service/useLoginInfo'
import { computed, inject, provide, ref } from 'vue'
import { ProductType } from '@/lib/enum'

export interface BreadcrumbItem {
  name: string
  path?: string
  mobileShow?: boolean
}

const botGuidWithType = ref('')

const state = {
  orgGuid: ref('5db11c59'),
  lineBotGuid: ref('5db13bab'),
  fbBotGuid: ref('5db2af62'),
  botGuidWithType,
  botType: computed<ProductType>(() => +botGuidWithType.value.split('_')[0]),
  botGuid: computed<string>(() => botGuidWithType.value.split('_')[1]),
  breadcrumb: ref<BreadcrumbItem[]>([]),
  loginInfo: ref<LoginInfoRes>(),
}

export const useGlobalProvider = function () {
  provide('global', state)
}

export const useGlobalState = function () {
  return inject<typeof state>('global')
}
