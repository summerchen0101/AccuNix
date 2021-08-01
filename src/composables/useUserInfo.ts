import { ref } from "vue";

const useUserInfo = function () {
  const user = ref<{ name: string }>(null);

  const getUser = async () => {
    user.value = { name: "summer" };
  };

  return {
    user,
    getUser,
  };
};

export default useUserInfo;
