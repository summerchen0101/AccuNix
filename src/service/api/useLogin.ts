import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { useBotStore } from '@/service/store/botStore'
import { ref } from 'vue'
import { LoginInfoRes } from './useLoginInfo'

export interface LoginReq {
  username: string
  password: string
  app: string
  redirectUrl: string
}

export type LoginRes = LoginInfoRes

function useLogin() {
  const apiErrHandler = useApiErrHandler()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<LoginRes>(null)
  const botStore = useBotStore()
  const doLogin = async (req: LoginReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<LoginRes>({
        method: 'post',
        url: 'login',
        data: req,
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

  return { data, doLogin, isLoading }
}

export default useLogin
