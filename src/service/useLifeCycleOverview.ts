import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { BotType } from '@/lib/enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../providers/globalProvider'

export interface LifeCycleOverviewRes {
  data: Data
  message?: string
}

export interface Data {
  averageClickDays: number
  lifecycleDays: number
  lifecycle: LifeCycle[]
}

export interface LifeCycle {
  id: number
  title: string
  color: string
  users_count: number
  users_percent: string
}

function useLifeCycleOverview(type: BotType) {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid, fbBotGuid } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<LifeCycleOverviewRes['data']>(null)
  const apiPathMap: Record<BotType, string> = {
    line: `LINEBot/${lineBotGuid.value}`,
    fb: `FBMessengerBot/${fbBotGuid.value}`,
  }
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<LifeCycleOverviewRes>({
        method: 'get',
        url: `${apiPathMap[type]}/Dashboard/lifecycle-overview`,
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

export default useLifeCycleOverview
