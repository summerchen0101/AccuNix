import { inject, provide, ref } from "vue";

const state = {
  isMiniSidebar: ref(false),
};

export const useLayoutProvider = function () {
  provide("layout", state);
};

export const useLayoutState = function () {
  return inject<typeof state>("layout");
};
