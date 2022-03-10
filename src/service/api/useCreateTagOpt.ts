import { useBotStore } from '@/service/store/botStore'
import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'

export interface TagOptCreateReq {
  name: string
  description: string
  days: number
}

export interface TagOptCreateRes {
  data?: Data
  message: string
}

export interface Data {
  id: number
  name: string
}

function useTagOptCreate() {
  const apiErrHandler = useApiErrHandler()
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)

  const doCreate = async (data: TagOptCreateReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<TagOptCreateRes>({
        method: 'post',
        url: `${botStore.botApiPath}/Tag`,
        data,
      })
      if (res.message !== 'success') {
        isError.value = true
      }
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
  }

  return { doCreate, isLoading, isError }
}

export default useTagOptCreate
