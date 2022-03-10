<template>
  <div class="transition-all relative z-10">
    <div class="bg-white flex items-center h-14 shadow-md">
      <div class="flex-1 flex items-center justify-end h-full">
        <div class="flex items-center justify-center h-full cursor-pointer relative group">
          <span class="el-avatar el-avatar--circle"
            ><img src="https://blb.accubot.com.tw/uploads/!logged-user.jpg"
          /></span>
          <div class="text-center w-28">
            <div class="">{{ loginInfo?.name }}</div>
            <div class="text-gray-500 text-sm">maintainer</div>
          </div>
          <i class="el-icon-arrow-down mr-3"></i>
          <div class="pt-14 invisible absolute top-0 right-0 group-hover:visible">
            <div
              class="
                border
                bg-white
                h-32
                w-40
                sm:w-48
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
                <i :hidden="!isLogoutLoading" class="fas fa-sync-alt animate-spin ml-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAlert from '@/hooks/useAlert'
import { useLayoutState } from '@/providers/layoutProvider'
import useLogout from '@/service/api/useLogout'
import { useBotStore } from '@/service/store/botStore'
import { defineComponent } from '@vue/runtime-core'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(props) {
    const router = useRouter()
    const { isMiniSidebar } = useLayoutState()
    const { doLogout, isLoading: isLogoutLoading } = useLogout()
    const alert = useAlert()
    const { loginInfo } = storeToRefs(useBotStore())
    const handleLogout = async () => {
      await doLogout()
      alert('登出成功', 'success')
      router.push('/login')
    }
    return {
      isMiniSidebar,
      handleLogout,
      isLogoutLoading,
      loginInfo,
    }
  },
})
</script>

<style scoped lang="scss"></style>
