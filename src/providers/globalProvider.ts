import { LoginInfoRes } from './../service/api/useLoginInfo'
import { computed, inject, provide, ref, watchEffect } from 'vue'
import { ProductType } from '@/lib/enum'
import { productApiPathMap } from '@/lib/maps'

export interface BreadcrumbItem {
  name: string
  path?: string
  mobileShow?: boolean
}

const botGuidWithType = ref('')
const loginInfo = ref<LoginInfoRes>()
const botType = computed<ProductType>(() => +botGuidWithType.value.split('_')[0])
const botGuid = computed<string>(() => botGuidWithType.value.split('_')[1])

const isShowTagPopup = ref(false)

const state = {
  botGuidWithType,
  botType,
  botGuid,
  botInfo: computed(() => loginInfo.value?.bots.find((t) => t.GUID === botGuid.value)),
  botApiPath: computed(() => (botGuid.value ? `${productApiPathMap[botType.value]}/${botGuid.value}` : null)),
  breadcrumb: ref<BreadcrumbItem[]>([]),
  loginInfo,
  isShowTagPopup,
}

export const useGlobalProvider = function () {
  provide('global', state)
}

export const useGlobalState = function () {
  return inject<typeof state>('global')
}
