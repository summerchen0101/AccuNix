import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { BotType } from '@/lib/enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../providers/globalProvider'

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

function useFriendTrand(type: BotType) {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid, fbBotGuid } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<FriendTrand[]>([])
  const apiPathMap: Record<BotType, string> = {
    line: `LINEBot/${lineBotGuid.value}`,
    fb: `FBMessengerBot/${fbBotGuid.value}`,
  }
  const fetchData = async (req: FriendTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<FriendTrandRes>({
        method: 'get',
        url: `${apiPathMap[type]}/Dashboard/friend-trend`,
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
