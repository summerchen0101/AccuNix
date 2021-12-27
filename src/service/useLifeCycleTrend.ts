import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useGlobalState } from '../providers/globalProvider'

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
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<LifeCycleTrand[]>([])

  const fetchData = async (req: LifeCycleTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<LifeCycleTrandRes>({
        method: 'get',
        url: `${botApiPath.value}/Dashboard/lifecycle-trend`,
        config: { params: req },
      })
      data.value = res.data
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    console.log(data.value)
    return data.value
  }

  return { data, fetchData, isLoading }
}

export default useLifeCycleTrand
