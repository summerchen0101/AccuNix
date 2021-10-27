import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLineBotState } from './../providers/lineBotProvider'

export interface Keyword {
  name: string
  user_count: number
  user_percentage: string
  active_count: number
  active_percentage: string
}

export interface KeywordOverviewRes {
  data: Keyword[]
  message?: string
}

function useKeywordList() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid } = useLineBotState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<KeywordOverviewRes['data']>([])
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<KeywordOverviewRes>({
        method: 'get',
        url: `api/line/${lineBotGuid.value}/keywords`,
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

export default useKeywordList
