import Axios, { AxiosRequestConfig, Method } from "axios";
import store from "store2";

export const request = async function <R extends {} = {}, B extends {} = {}>({
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
  try {
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
  } catch (err) {
    // apiErrHandler(err);
  }
  return null;
};
