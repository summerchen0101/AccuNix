import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { useBotStore } from '@/service/store/botStore'
import { ref } from 'vue'

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
  const apiErrHandler = useApiErrHandler()
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<FriendTrand[]>([])
  const fetchData = async (req: FriendTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<FriendTrandRes>({
        method: 'get',
        url: `${botStore.botApiPath}/Dashboard/friend-trend`,
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

export default useFriendTrand
