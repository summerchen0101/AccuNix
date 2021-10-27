import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'

export interface LoginReq {
  username: string
  password: string
  app: string
  redirectUrl: string
}

export interface ClientInfo {
  ip: string
  REQUEST_URI: string
  HTTP_REFERER: string
  REQUEST_METHOD: string
  HTTP_USER_AGENT: string
  REDIRECT_STATUS: string
}

export interface Auth {
  id: number
  organization_id: number
  name: string
  username: string
  email: string
  email_verified_at?: any
  password_need_reset: number
  last_active_at: string
  is_online: number
  client_info: ClientInfo
  system_setting?: any
  created_at: string
  updated_at: string
  deleted_at?: any
  picture: string
}

export interface LoginRes {
  auth?: Auth
  message?: string
}

function useLogin() {
  const isLoading = ref(false)
  const isError = ref(false)
  const res = ref<LoginRes>(null)
  const doLogin = async (req: LoginReq) => {
    isLoading.value = true
    isError.value = false
    try {
      res.value = await useRequest<LoginRes>({
        method: 'post',
        url: 'login',
        data: req,
      })
    } catch (err) {
      isError.value = true
    }
    isLoading.value = false
    return res.value
  }

  return { loginRes: res, doLogin, isLoading }
}

export default useLogin
