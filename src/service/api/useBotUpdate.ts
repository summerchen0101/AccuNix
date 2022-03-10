import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useBotStore } from '@/service/store/botStore'

export interface BotUpdateReq {
  description: string
}

function useBotUpdate() {
  const apiErrHandler = useApiErrHandler()
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const doUpdate = async (data: BotUpdateReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest({
        method: 'patch',
        url: `${botStore.botApiPath}/updateData`,
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
