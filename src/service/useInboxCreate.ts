import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLineBotState } from './../providers/lineBotProvider'

export interface InboxCreateReq {
  name: string
  selected: boolean
  chatBarText: string
  size: Size
  areas: Area[]
}

export interface Area {
  action: Action
  bounds: Bounds
}

export interface Action {
  tags?: string[]
  type: string
  richmenuGuid?: number | string
  messageGuid?: string
  uri?: string
  original?: boolean
  couponGuid?: string
  keyword?: string
}

export interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

export interface Size {
  width: number
  height: number
}

function useInboxCreate() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid } = useLineBotState()
  const isLoading = ref(false)
  const isError = ref(false)
  const doCreate = async (req: InboxCreateReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest({
        method: 'post',
        url: `/LINEBot/${lineBotGuid.value}/Richmenu/store`,
        config: { params: req },
      })
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
  }

  return { doCreate, isLoading }
}

export default useInboxCreate
