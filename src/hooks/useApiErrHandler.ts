import httpStatus from 'http-status'
import store from 'store2'
import { useRoute, useRouter } from 'vue-router'
import useAlert from './useAlert'

export function useApiErrHandler() {
  const router = useRouter()
  const route = useRoute()
  const alert = useAlert()
  return (error: any) => {
    console.log(error.message)
    if (error.response) {
      // 错误来自回传参数
      let msg = '錯誤發生'
      const statusErrMsg = httpStatus[error.response.status] as string

      if (statusErrMsg) {
        msg = httpStatus[error.response.status] as string
        console.log(msg)
      }
      if (error.response.status === 401) {
        router.push({ path: '/login', query: { from: route.fullPath } })
        store.session.set('token', '')
        msg = '請重新登入'
      }
      if (error.response.data.message) {
        msg = error.response.data.message
        console.log(msg)
      }
      alert(msg, 'error')
    } else if (error.request) {
      // 错误来自请求参数
      console.log(error.request)
    } else if (error.message) {
      // 错误来自其他因素
      alert(error.message, 'error')
    }
    // console.log(error.config)
  }
}
