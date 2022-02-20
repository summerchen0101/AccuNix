import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useGlobalState } from '@/providers/globalProvider'

export interface BotUpdateReq {
  description: string
}

function useBotUpdate() {
  const apiErrHandler = useApiErrHandler()
  const { botApiPath } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const doUpdate = async (data: BotUpdateReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest({
        method: 'patch',
        url: `${botApiPath.value}/updateData`,
        data,
      })
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
  }

  return { doUpdate, isLoading }
}

export default useBotUpdate
