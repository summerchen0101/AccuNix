import { ListBaseReq, ListMeta } from './../types/index'
import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLineBotState } from './../providers/lineBotProvider'

export interface InboxListReq extends ListBaseReq {
  search?: string
  fields?: string
}
export interface InboxListRes {
  data: Data
  links: Links
  meta: ListMeta
  message?: string
}

export interface Data {
  rows: Inbox[]
  total: number
}

export interface Inbox {
  id: number
  guid: string
  name: string
  description: null | string
  created_at: Date
  is_default: boolean
  specify_count: number
  users_count: number
  image_path: string
}

export interface Links {
  first: string
  last: string
  prev: null
  next: string
}

function useInboxList() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const { lineBotGuid } = useLineBotState()
  const isLoading = ref(false)
  const isError = ref(false)
  const list = ref<Inbox[]>([])
  const meta = ref<ListMeta>()
  const fetchData = async (req: InboxListReq = {}) => {
    isLoading.value = true
    isError.value = false
    try {
      const res = await useRequest<InboxListRes>({
        method: 'get',
        url: `/LINEBot/${lineBotGuid.value}/Richmenu/getIndexList`,
        config: { params: req },
      })
      list.value = res.data.rows
      meta.value = res.meta
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    return list.value
  }

  return { list, meta, fetchData, isLoading }
}

export default useInboxList
