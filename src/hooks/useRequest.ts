import Axios, { AxiosRequestConfig, Method } from 'axios'
import store from 'store2'

const useRequest = async function <
  R extends { message?: string } = {},
  B extends {} = {},
>({
  method,
  url,
  data,
  config,
}: {
  method: Method
  url: string
  data?: B
  config?: AxiosRequestConfig
}) {
  const res = await Axios.request<R>({
    method,
    url,
    data,
    baseURL: import.meta.env.VITE_API_BASE_URL,
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 422
    },
    headers: {
      Authorization: `Bearer ${store.session.get('token')}`,
    },
    withCredentials: true,
    ...config,
  })

  if (res.data.message && !res.data.message.includes('success')) {
    throw new Error(res.data.message)
  }
  const newToken = res.headers.authorization?.replace('Bearer ', '')
  if (newToken) {
    const oldToken = store.session.get('token')
    store.session.set('token', newToken)
    console.log(`
          Refresh Token at ${new Date().toLocaleTimeString()}
          old: ...${oldToken.slice(-3)}
          new: ...${newToken.slice(-3)}
        `)
  }
  // if (res.data.success === false) {
  //   console.log(res.data);
  //   throw Error(res.data?.message || "错误发生");
  // }
  return res.data
}

export default useRequest
