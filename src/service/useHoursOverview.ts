import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { BotType } from '@/lib/enum'
import { useGlobalState } from '@/providers/globalProvider'
import { ref } from 'vue'

export interface HourData {
  users: number
}

export interface HoursOverviewRes {
  data: HourData[]
  message?: string
}

function useHoursOverview(type: BotType) {
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid, fbBotGuid } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<HoursOverviewRes['data']>([])
  const apiPathMap: Record<BotType, string> = {
    line: `LINEBot/${lineBotGuid.value}`,
    fb: `FBMessengerBot/${fbBotGuid.value}`,
  }
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<HoursOverviewRes>({
        method: 'get',
        url: `${apiPathMap[type]}/Dashboard/freqhour-overview`,
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

export default useHoursOverview
