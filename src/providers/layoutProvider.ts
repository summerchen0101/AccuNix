import { inject, provide, ref } from "vue";

const state = {
  isMiniSidebar: ref(false),
  activePage: "Home",
};

export const useLayoutProvider = function () {
  provide("layout", state);
};

export const useLayoutState = function () {
  return inject<typeof state>("layout");
};
