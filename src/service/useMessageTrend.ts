import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useGlobalState } from '../providers/globalProvider'

export interface MessageTrandReq {
  startAt?: string
  endAt?: string
}

export interface MessageTrand {
  push: number
  reply: number
  date: Date
}

export interface MessageTrandRes {
  data: MessageTrand[]
  message?: string
}

function useMessageTrand() {
  const apiErrHandler = useApiErrHandler()
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<MessageTrand[]>([])

  const fetchData = async (req: MessageTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<MessageTrandRes>({
        method: 'get',
        url: `${botApiPath.value}/Dashboard/message-trend`,
        config: { params: req },
      })
      data.value = res.data
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    return data.value
  }

  return { data, fetchData, isLoading }
}

export default useMessageTrand
