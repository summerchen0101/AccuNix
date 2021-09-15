import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLineBotState } from '../providers/lineBotProvider'

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
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid } = useLineBotState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<MessageTrand[]>([])
  const fetchData = async (req: MessageTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<MessageTrandRes>({
        method: 'get',
        url: `LINEBot/${lineBotGuid.value}/dashboard/message-trend`,
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
