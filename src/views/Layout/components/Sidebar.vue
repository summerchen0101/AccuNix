<template>
  <!-- sidebar cover背景 -->
  <div
    class="fixed h-full w-full top-0 left-0 bg-black/20 transition-all md:hidden z-30"
    :class="isMiniSidebar ? 'opacity-0 invisible' : 'opacity-100 visible'"
    @click="isMiniSidebar = !isMiniSidebar"
  ></div>
  <!-- menu本體 -->
  <div class="bg-white fixed h-full z-30 group shadow-xl">
    <div class="flex gap-3 items-center justify-center h-16 relative">
      <div class="absolute left-0 ml-4">
        <i class="fas fa-bars text-xl cursor-pointer text-gray-500" @click="isMiniSidebar = !isMiniSidebar"> </i>
      </div>
      <router-link :hidden="isMiniSidebar" to="/"
        ><img class="w-28 h-auto" src="@/assets/logo.png" alt=""
      /></router-link>
    </div>
    <div class="relative z-20 sidebar h-full" :class="isMiniSidebar ? 'w-12 mini' : 'w-52 md:w-52'">
      <div class="w-full flex flex-col">
        <div class="p-2">
          <el-select
            :class="isMiniSidebar && 'invisible opacity-0 -translate-x-full'"
            class="w-full transition-all"
            size="small"
            v-model="botInfo"
          >
            <el-option v-for="opt in botOpts" :key="opt.value" :label="opt.label" :value="opt.value">
              <img :src="opt.img" class="rounded-full w-7 h-7 inline-block mr-2" alt="" />
              {{ opt.label }}
            </el-option>
          </el-select>
        </div>
        <ul class="flex-1">
          <MenuItem v-for="m in filterdMenu" :key="m.label" :menu="m" :stage="1" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MenuItem from '@/views/Layout/components/MenuItem.vue'
import { menuList } from '@/lib/menu'
import { useBotStore } from '@/service/store/botStore'
import { useLayoutState } from '@/providers/layoutProvider'
import { computed, defineComponent, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  setup(props) {
    const router = useRouter()
    const { isMiniSidebar } = useLayoutState()
    const botStore = useBotStore()
    const botOpts = computed(() =>
      botStore.loginInfo?.bots.map((t) => ({
        guid: t.GUID,
        label: `${t.name}`,
        value: `${t.product_type_id}_${t.GUID}`,
        img: t.picture,
      })),
    )

    const filterdMenu = computed(
      () => menuList,
      // .map((m) => {
      //   return {
      //     ...m,
      //     subs: m.subs?.filter((n) => loginInfo.value?.organization.permissions[n.code]?.read),
      //   }
      // })
      // .filter((m) => (m.subs ? m.subs?.length > 0 : loginInfo.value?.organization.permissions[m.code]?.read)),
    )
    // watch(
    //   () => perBotMenus.value,
    //   () => {
    //     if (perBotMenus.value.length) {
    //       router.push(perBotMenus.value[0].path)
    //     }
    //   },
    // )
    return {
      isMiniSidebar,
      filterdMenu,
      botOpts,
      botInfo: botStore.botInfo,
    }
  },
})
</script>

<style scoped lang="scss"></style>
