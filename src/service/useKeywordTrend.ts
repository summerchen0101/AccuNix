import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { BotType } from '@/lib/enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../providers/globalProvider'

export interface KeywordTrandReq {
  startAt?: string
  endAt?: string
}

export interface KeywordTrand {
  id: number
  keyword: string
  totalActiveCount: number
  overall: number
  compared: number
}

export interface KeywordTrandRes {
  data: KeywordTrand[]
  message?: string
}

function useKeywordTrand() {
  const apiErrHandler = useApiErrHandler()
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<KeywordTrand[]>([])

  const fetchData = async (req: KeywordTrandReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<KeywordTrandRes>({
        method: 'get',
        url: `${botApiPath.value}/Dashboard/keyword-trend`,
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

export default useKeywordTrand
