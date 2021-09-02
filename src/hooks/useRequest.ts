import Axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import httpStatus from "http-status";
import store from "store2";
import { useRoute, useRouter } from "vue-router";
import useAlert from "./useAlert";

const useRequest = async function <
  R extends { message?: string } = {},
  B extends {} = {}
>({
  method,
  url,
  data,
  config,
}: {
  method: Method;
  url: string;
  data: B;
  config?: AxiosRequestConfig;
}) {
  const alert = useAlert();
  const res = await Axios.request<R>({
    method,
    url,
    data,
    baseURL: "/api",
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 422;
    },
    headers: {
      Authorization: `Bearer ${store.session.get("token")}`,
    },
    ...config,
  });
  if (res.data.message) {
    throw new Error(res.data.message);
  }
  const newToken = res.headers.authorization?.replace("Bearer ", "");
  if (newToken) {
    const oldToken = store.session.get("token");
    store.session.set("token", newToken);
    console.log(`
          Refresh Token at ${new Date().toLocaleTimeString()}
          old: ...${oldToken.slice(-3)}
          new: ...${newToken.slice(-3)}
        `);
  }
  // if (res.data.success === false) {
  //   console.log(res.data);
  //   throw Error(res.data?.message || "错误发生");
  // }
  return res.data;
};

export default useRequest;

export function apiErrHandler(error: AxiosError<any>) {
  const router = useRouter();
  const route = useRoute();
  const alert = useAlert();
  console.log(error.message);
  if (error.response) {
    // 错误来自回传参数
    let msg = "錯誤發生";
    const statusErrMsg = httpStatus[error.response.status] as string;

    if (statusErrMsg) {
      msg = httpStatus[error.response.status] as string;
      console.log(msg);
    }
    if (error.response.status === 401) {
      router.push({ path: "/login", query: { from: route.fullPath } });
      store.session.set("token", "");
      msg = "請重新登入";
    }
    if (error.response.data.message) {
      msg = error.response.data.message;
      console.log(msg);
    }
    alert(msg);
  } else if (error.request) {
    // 错误来自请求参数
    console.log(error.request);
  } else if (error.message) {
    // 错误来自其他因素
    alert(error.message);
  }
  // console.log(error.config)
}
