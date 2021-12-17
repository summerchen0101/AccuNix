import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../providers/globalProvider'

export interface LoginInfoRes {
  id: number
  name: string
  picture: string
  organization: Organization
  bots: Bot[]
  message?: string
}

export interface Bot {
  id: number
  product_type_id: number
  name: string
  description: null | string
  basic_id?: string
  picture: string
  GUID: string
  default_richmenu_id?: number | null
  tagCount: number
  tagQuota: number
  followers?: number
  blocks?: number
  isAccessTokenValid: boolean
  webhook?: Webhook
  permissions: { [key: string]: Permission }
  page_id?: string
  default_persistent_menu_id?: number
  euPrivacyStatus?: boolean
  usersCount?: number
  canUpdateToken?: boolean
  originTokenExpiresAt?: number
}

export interface Permission {
  read: boolean
  edit: boolean
}

export interface Webhook {
  active: boolean
  endpoint: boolean
}

export interface Organization {
  id: number
  name: string
  GUID: string
  permissions: { [key: string]: Permission }
}

function useLoginInfo() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { loginInfo } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<LoginInfoRes>()

  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<LoginInfoRes>({
        method: 'post',
        url: `/auth/getInfo`,
      })
      data.value = res
      loginInfo.value = res
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
