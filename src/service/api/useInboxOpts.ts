import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useGlobalState } from '@/providers/globalProvider'

export interface Image {
  id: number
  path: string
}

export interface RichmenuOpt {
  id: number
  name: string
  image_id: number
  image: Image
}

export interface InboxListRes {
  data: RichmenuOpt[]
  message?: string
}

function useRichmenuOpts() {
  const apiErrHandler = useApiErrHandler()
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<RichmenuOpt[]>([])
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<InboxListRes>({
        method: 'get',
        url: `${botApiPath.value}/Richmenu/getAll`,
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

export default useRichmenuOpts
