import { useApiErrHandler } from '@/hooks/useApiErrHandler'
import useRequest from '@/hooks/useRequest'
import { ResBase } from '@/types'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

interface ImgUploadRes extends ResBase {
  organization_id: number
  user_id: number
  type: string
  from: string
  path: string
  updated_at: Date
  created_at: Date
  id: number
}

function useImgUpload() {
  const router = useRouter()
  const apiErrHandler = useApiErrHandler()
  const isLoading = ref(false)
  const isError = ref(false)
  let res = reactive<ImgUploadRes>(null)
  const doUpload = async (data: FormData) => {
    isLoading.value = true
    isError.value = false
    try {
      res = await useRequest<ImgUploadRes>({
        method: 'post',
        url: 'uploadFile/store',
        data,
      })
    } catch (err) {
      apiErrHandler(err)
      isError.value = true
    }
    isLoading.value = false
    return res
  }

  return { doUpload, isLoading, imgUrl: res?.path }
}

export default useImgUpload
