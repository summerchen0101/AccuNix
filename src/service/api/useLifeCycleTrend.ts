import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useBotStore } from '@/service/store/botStore'

export interface LifeCycleTrandReq {
  startAt?: string
  endAt?: string
}

export interface LifeCycleTrand {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  date: Date
}

export interface LifeCycleTrandRes {
  data: LifeCycleTrand[]
  message?: string
}

function useLifeCycleTrand() {
  const apiErrHandler = useApiErrHandler()
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<LifeCycleTrand[]>([])

  const fetchData = async (req: LifeCycleTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<LifeCycleTrandRes>({
        method: 'get',
        url: `${botStore.botApiPath}/Dashboard/lifecycle-trend`,
        config: { params: req },
      })
      list.value = res.data
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    return list.value
  }

  return { list, fetchData, isLoading }
}

export default useLifeCycleTrand
