import Axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import httpStatus from "http-status";
import store from "store2";
import { Router, useRoute, useRouter } from "vue-router";
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
  data?: B;
  config?: AxiosRequestConfig;
}) {
  const alert = useAlert();
  const router = useRouter();
  console.log(router);
  const res = await Axios.request<R>({
    method,
    url,
    data,
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : "/api",
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
