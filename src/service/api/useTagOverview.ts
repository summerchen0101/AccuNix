import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useGlobalState } from '@/providers/globalProvider'


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

function useTagOverview() {
  const apiErrHandler = useApiErrHandler()
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<TagOverviewRes['data']>([])
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<TagOverviewRes>({
        method: 'get',
        url: `${botApiPath.value}/Dashboard/tag-overview`,
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
