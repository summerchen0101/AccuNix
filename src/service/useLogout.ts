import useRequest from "@/hooks/useRequest";
import { ref } from "vue";

export interface LogoutRes {
  message?: string;
}

function useLogout() {
  const isLoading = ref(false);
  const isError = ref(false);
  const res = ref<LogoutRes>(null);
  const doLogout = async () => {
    isLoading.value = true;
    isError.value = false;
    try {
      res.value = await useRequest<LogoutRes>({
        method: "post",
        url: "logout",
        data: { app: "accunix" },
      });
    } catch (err) {
      isError.value = true;
    }
    isLoading.value = false;
    return res.value;
  };

  return { loginRes: res, doLogout, isLoading };
}

export default useLogout;
