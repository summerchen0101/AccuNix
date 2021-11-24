import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { BotType } from '@/lib/enum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalState } from '../providers/globalProvider'

export interface ScriptOverviewReq {
  startAt?: string
  endAt?: string
}

export interface Script {
  id: number
  name: string
  total: number
  finish: string
}

export interface ScriptOverviewRes {
  data: Script[]
  message?: string
}

function useScriptOverview(type: BotType) {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid, fbBotGuid } = useGlobalState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<ScriptOverviewRes['data']>([])
  const apiPathMap: Record<BotType, string> = {
    line: `LINEBot/${lineBotGuid.value}`,
    fb: `FBMessengerBot/${fbBotGuid.value}`,
  }
  const fetchData = async (req: ScriptOverviewReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<ScriptOverviewRes>({
        method: 'get',
        url: `${apiPathMap[type]}/Dashboard/script-overview`,
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

export default useScriptOverview
