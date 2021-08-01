<template>
  <div class="p-3 bg-white flex items-center h-14 fixed top-0 w-screen z-20">
    <div class="w-64">
      <img class="w-32 h-auto" src="../../assets/logo.png" alt="" />
    </div>
    <div class="flex-1 flex justify-end md:justify-between">
      <i
        class="round-btn-static text-gray-400 fas fa-bars"
        @click="isMiniSidebar = !isMiniSidebar"
      >
      </i>
      <i class="fas fa-sign-out-alt round-btn-static hidden md:flex"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { useLayoutState } from "../../providers/layoutProvider";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Header",
  setup(props) {
    const { isMiniSidebar } = useLayoutState();
    return { isMiniSidebar };
  },
});
</script>

<style scoped lang="scss"></style>
