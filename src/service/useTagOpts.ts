import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useGlobalState } from '../providers/globalProvider'

export interface TagOptsRes {
  message: string
  data: Data
}

export interface Data {
  total: number
  rows: TagOpt[]
}

export interface TagOpt {
  id: number
  name: string
}

function useTagOpts() {
  const apiErrHandler = useApiErrHandler()
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<TagOpt[]>([])
  const total = ref(0)
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<TagOptsRes>({
        method: 'get',
        url: `${botApiPath.value}/Tag/getData`,
      })
      list.value = res.data.rows
      total.value = res.data.total
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    return list.value
  }

  return { list, total, fetchData, isLoading }
}

export default useTagOpts
