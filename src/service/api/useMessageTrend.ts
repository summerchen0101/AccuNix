import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useBotStore } from '@/service/store/botStore'

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
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<MessageTrand[]>([])

  const fetchData = async (req: MessageTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<MessageTrandRes>({
        method: 'get',
        url: `${botStore.botApiPath}/Dashboard/message-trend`,
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

export default useMessageTrand
