<template>
  <div class="bg-white flex items-center h-14 fixed top-0 w-screen z-20">
    <div class="w-64 p-3">
      <img class="w-36 h-auto" src="@/assets/logo.png" alt="" />
    </div>
    <div class="flex-1 flex items-center justify-end h-full">
      <i
        class="round-btn round-btn-static text-gray-400 fas fa-bars"
        @click="isMiniSidebar = !isMiniSidebar"
      >
      </i>
      <div class="flex-1"></div>
      <div
        class="
          flex
          items-center
          justify-center
          border-l
          h-full
          cursor-pointer
          relative
          group
          w-52
        "
      >
        <span class="el-avatar el-avatar--circle"
          ><img src="https://blb.accubot.com.tw/uploads/!logged-user.jpg"
        /></span>
        <div class="text-center w-28">
          <div class="">Accunix</div>
          <div class="text-gray-500 text-sm">maintainer</div>
        </div>
        <i class="el-icon-arrow-down"></i>
        <div class="pt-14 invisible absolute top-0 right-0 group-hover:visible">
          <div
            class="
              border
              bg-white
              h-32
              w-52
              transition-all
              scale-y-0
              group-hover:scale-y-100
              origin-top
              text-gray-400 text-sm
              flex flex-col
              gap-4
              p-4
            "
          >
            <div class="hover:text-gray-500">
              <i class="fas fa-user-cog"></i>
              編輯個人資料
            </div>
            <div class="hover:text-gray-500">
              <i class="fa fa-download"></i>
              下載紀錄
            </div>
            <div class="hover:text-gray-500">
              <i class="fas fa-power-off"></i>
              登出
            </div>
          </div>
        </div>
      </div>
      <!-- <i
        class="fas fa-sign-out-alt round-btn round-btn-static hidden md:flex"
        @click="handleLogout"
      ></i> -->
    </div>
  </div>
</template>

<script lang="ts">
import useAlert from '@/hooks/useAlert'
import { useLayoutState } from '@/providers/layoutProvider'
import useLogout from '@/service/useLogout'
import { defineComponent, PropType } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(props) {
    const router = useRouter()
    const { isMiniSidebar } = useLayoutState()
    const { doLogout, isLoading } = useLogout()
    const alert = useAlert()
    const handleLogout = async () => {
      await doLogout()
      alert('登出成功', 'success')
      router.push('/login')
    }
    return { isMiniSidebar, handleLogout }
  },
})
</script>

<style scoped lang="scss"></style>
