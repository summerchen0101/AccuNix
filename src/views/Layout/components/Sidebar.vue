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
            v-model="bot"
          >
            <el-option v-for="opt in botOpts" :key="opt.value" :label="opt.label" :value="opt.value">
              <img :src="opt.img" class="rounded-full w-7 h-7 inline-block mr-2" alt="" />
              {{ opt.label }}
            </el-option>
          </el-select>
        </div>
        <ul class="flex-1">
          <MenuItem v-for="m in menuList" :key="m.label" :menu="m" :stage="1" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { menuList } from '@/lib/menu'
import { useLayoutState } from '@/providers/layoutProvider'
import { useBotStore } from '@/service/store/botStore'
import MenuItem from '@/views/Layout/components/MenuItem.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState()
    const botStore = useBotStore()
    const botOpts = computed(() =>
      botStore.botList.map((t) => ({
        guid: t.GUID,
        label: `${t.name}`,
        value: `${t.product_type_id}_${t.GUID}`,
        img: t.picture,
      })),
    )

    return {
      isMiniSidebar,
      menuList,
      botOpts,
      bot: botStore.bot,
    }
  },
})
</script>

<style scoped lang="scss"></style>
