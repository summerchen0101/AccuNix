import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { useLineBotState } from '@/providers/lineBotProvider'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface HourData {
  users: number
}

export interface HoursOverviewRes {
  data: HourData[]
  message?: string
}

function useHoursOverview() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid } = useLineBotState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<HoursOverviewRes['data']>([])
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<HoursOverviewRes>({
        method: 'get',
        url: `LINEBot/${lineBotGuid.value}/dashboard/freqhour-overview`,
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
