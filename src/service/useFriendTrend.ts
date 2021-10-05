import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLineBotState } from '../providers/lineBotProvider'

export interface FriendTrandReq {
  startAt?: string
  endAt?: string
}

export interface FriendTrand {
  date: Date
  dailyFollowers: number
  cumulativeFollowers: number
  dailyBlocks: number
  cumulativeBlocks: number
}

export interface FriendTrandRes {
  data: FriendTrand[]
  message?: string
}

function useFriendTrand() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid } = useLineBotState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<FriendTrand[]>([])
  const fetchData = async (req: FriendTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<FriendTrandRes>({
        method: 'get',
        url: `LINEBot/${lineBotGuid.value}/Dashboard/friend-trend`,
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

export default useFriendTrand
