import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { useBotStore } from '@/service/store/botStore'
import { ResBase } from '@/types'
import { ref } from 'vue'

export interface LoginInfoRes extends ResBase {
  id: number
  name: string
  picture: string
  bots: Bot[]
  organization: Organization
  permissions: { [key: string]: boolean }
}

export interface Bot {
  id: number
  name: string
  description: string
  picture: string
  basic_id?: string
  GUID: string
  default_richmenu_id?: number
  tagCount: number
  type: number
  tagQuota: number
  followers?: number
  blocks?: number
  isAccessTokenValid: boolean
  webhook?: Webhook
  menus: Menu[]
  page_id?: string
  default_persistent_menu_id?: null | number
  euPrivacyStatus?: boolean
  usersCount?: number
  canUpdateToken?: boolean
  originTokenExpiresAt?: number
}

export interface Menu {
  name: string
  permission: null | string
  target: null | string
  disabled: boolean
  href: string
  icon: null | string
  children?: Menu[]
}

export interface Webhook {
  active: boolean
  endpoint: boolean
}

export interface Organization {
  id: number
  name: string
  GUID: string
  tagQuota: number
}

function useLoginInfo() {
  const apiErrHandler = useApiErrHandler()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<LoginInfoRes>()
  const botStore = useBotStore()

  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<LoginInfoRes>({
        method: 'post',
        url: `/auth/getInfo`,
      })
      data.value = res
      botStore.gotLoginInfo(res)
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    return data.value
  }

  return { data, fetchData, isLoading }
}

export default useLoginInfo
