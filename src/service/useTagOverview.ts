import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { BotType } from '@/lib/enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../providers/globalProvider'

export interface Tag {
  name: string
  user_count: number
  user_percentage: string
  active_count: number
  active_percentage: string
}

export interface TagOverviewRes {
  data: Tag[]
  message?: string
}

function useTagOverview(type: BotType) {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid, fbBotGuid } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<TagOverviewRes['data']>([])
  const apiPathMap: Record<BotType, string> = {
    line: `LINEBot/${lineBotGuid.value}`,
    fb: `FBMessengerBot/${fbBotGuid.value}`,
  }
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<TagOverviewRes>({
        method: 'get',
        url: `${apiPathMap[type]}/Dashboard/tag-overview`,
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

export default useTagOverview
