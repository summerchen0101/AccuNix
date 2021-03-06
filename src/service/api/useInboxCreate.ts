import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useBotStore } from '@/service/store/botStore';

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

export interface Area {
  action: Action
  bounds: Bounds
}

export interface Data {
  name: string
  selected: boolean
  chatBarText: string
  size: Size
  areas: Area[]
}

export interface InboxCreateReq {
  name: string
  description: string
  image_url: string
  image_file_id: number
  data: Data
}

function useInboxCreate() {
  const apiErrHandler = useApiErrHandler()
  const botStore = useBotStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const doCreate = async (data: InboxCreateReq) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest({
        method: 'post',
        url: `${botStore.botApiPath}/Richmenu/store`,
        data,
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
