import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { LoginInfoRes } from './useLoginInfo'

export interface LoginReq {
  username: string
  password: string
  app: string
  redirectUrl: string
}

function useLogin() {
  const isLoading = ref(false)
  const isError = ref(false)
  const res = ref<LoginInfoRes>(null)
  const doLogin = async (req: LoginReq) => {
    isLoading.value = true
    isError.value = false
    try {
      res.value = await useRequest<LoginInfoRes>({
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
