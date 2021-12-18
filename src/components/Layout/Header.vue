<template>
  <div class="fixed top-0 w-screen z-30">
    <div class="bg-white flex items-center h-14">
      <div class="w-52 p-3">
        <img class="w-36 h-auto" src="@/assets/logo.png" alt="" />
      </div>
      <div class="flex-1 flex items-center justify-end h-full">
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
            w-40
            sm:w-52
          "
        >
          <span class="el-avatar el-avatar--circle hidden sm:block"
            ><img src="https://blb.accubot.com.tw/uploads/!logged-user.jpg"
          /></span>
          <div class="text-center w-28">
            <div class="">Accunix</div>
            <div class="text-gray-500 text-sm">maintainer</div>
          </div>
          <i class="el-icon-arrow-down"></i>
          <div
            class="pt-14 invisible absolute top-0 right-0 group-hover:visible"
          >
            <div
              class="
                border
                bg-white
                h-32
                w-40
                sm:w-52
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
                <i class="fas fa-user-cog mr-1"></i>
                編輯個人資料
              </div>
              <div class="hover:text-gray-500">
                <i class="fa fa-download mr-1"></i>
                下載紀錄
              </div>
              <div class="hover:text-gray-500" @click="handleLogout">
                <i class="fas fa-power-off mr-1"></i>
                登出
                <i
                  :hidden="!isLogoutLoading"
                  class="fas fa-sync-alt animate-spin ml-2"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        h-10
        bg-gradient-to-r
        from-primary-500
        to-primary-600
        text-white
        flex
        items-center
      "
    >
      <div
        class="sm:w-52 flex items-center justify-between px-4 text-primary-100"
      >
        <span :hidden="isMiniSidebar" class="text-sm hidden sm:inline-block"
          >功能選單</span
        >
        <i
          class="fas fa-bars cursor-pointer"
          @click="isMiniSidebar = !isMiniSidebar"
        >
        </i>
      </div>
      <div class="flex-1"></div>
      <div class="px-4"><Breadcrumb /></div>
    </div>
  </div>
</template>

<script lang="ts">
import useAlert from '@/hooks/useAlert'
import { useLayoutState } from '@/providers/layoutProvider'
import useLogout from '@/service/useLogout'
import { defineComponent, PropType } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import Breadcrumb from '../Breadcrumb.vue'

export default defineComponent({
  setup(props) {
    const router = useRouter()
    const { isMiniSidebar } = useLayoutState()
    const { doLogout, isLoading: isLogoutLoading } = useLogout()
    const alert = useAlert()
    const handleLogout = async () => {
      await doLogout()
      alert('登出成功', 'success')
      router.push('/login')
    }
    return { isMiniSidebar, handleLogout, isLogoutLoading }
  },
  components: { Breadcrumb },
})
</script>

<style scoped lang="scss"></style>
