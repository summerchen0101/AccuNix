import { LoginInfoRes } from './../service/useLoginInfo'
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
const botType = computed<ProductType>(
  () => +botGuidWithType.value.split('_')[0],
)
const botGuid = computed<string>(() => botGuidWithType.value.split('_')[1])

// watchEffect(() => {
//   console.log(botType.value)
//   console.log(productApiPathMap)
//   console.log(productApiPathMap[botType.value])
// })
const state = {
  orgGuid: ref('5db11c59'),
  lineBotGuid: ref('5db13bab'),
  fbBotGuid: ref('5db2af62'),
  botGuidWithType,
  botType,
  botGuid,
  botInfo: computed(() =>
    loginInfo.value?.bots.find((t) => t.GUID === botGuid.value),
  ),
  botApiPath: computed(() =>
    botGuid.value
      ? `${productApiPathMap[botType.value]}/${botGuid.value}`
      : null,
  ),
  breadcrumb: ref<BreadcrumbItem[]>([]),
  loginInfo,
}

export const useGlobalProvider = function () {
  provide('global', state)
}

export const useGlobalState = function () {
  return inject<typeof state>('global')
}
