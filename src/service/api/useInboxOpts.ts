import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useBotStore } from '@/service/store/botStore'

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
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<RichmenuOpt[]>([])
  const fetchData = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<InboxListRes>({
        method: 'get',
        url: `${botStore.botApiPath}/Richmenu/getAll`,
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
