<template>
  <div class="p-3 bg-white flex items-center h-14 fixed top-0 w-screen z-20">
    <div class="w-64">
      <img class="w-32 h-auto" src="@/assets/logo.png" alt="" />
    </div>
    <div class="flex-1 flex justify-end md:justify-between">
      <i
        class="round-btn round-btn-static text-gray-400 fas fa-bars"
        @click="isMiniSidebar = !isMiniSidebar"
      >
      </i>
      <i
        class="fas fa-sign-out-alt round-btn round-btn-static hidden md:flex"
        @click="handleLogout"
      ></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useAlert from "@/hooks/useAlert";
import { useLayoutState } from "@/providers/layoutProvider";
import useLogout from "@/service/useLogout";
import { useRouter } from "vue-router";
const router = useRouter();
const { isMiniSidebar } = useLayoutState();
const { doLogout, isLoading } = useLogout();
const alert = useAlert();
const handleLogout = async () => {
  await doLogout();
  alert("登出成功", "success");
  router.push("/login");
};
</script>

<style scoped lang="scss"></style>
