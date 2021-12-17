<template>
  <div
    class="
      bg-primary-600
      text-white
      transition-all
      fixed
      z-20
      hover:w-64
      overflow-x-hidden
      h-[calc(100%-3.5rem)]
      sidebar
      mt-14
    "
    :class="isMiniSidebar ? 'w-0 md:w-12 mini' : 'w-64 md:w-64'"
  >
    <div class="w-64 flex flex-col h-full">
      <div class="p-2">
        <el-select class="w-full">
          <el-option
            v-for="opt in botOpts"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          >
          </el-option>
        </el-select>
      </div>
      <ul class="flex-1 bg-black/20">
        <MenuItem v-for="m in botMenus" :key="m.label" :menu="m" />
      </ul>
      <ul>
        <MenuItem v-for="m in menuList" :key="m.label" :menu="m" />
      </ul>
    </div>
  </div>
  <div
    class="
      fixed
      h-full
      w-full
      bg-black bg-opacity-20
      z-10
      transition-all
      md:hidden
    "
    :class="isMiniSidebar ? 'opacity-0 invisible' : 'opacity-100 visible'"
    @click="isMiniSidebar = !isMiniSidebar"
  ></div>
</template>

<script lang="ts">
import MenuItem from '@/components/Layout/MenuItem.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import { computed, defineComponent } from 'vue'
import { menuList, botMenus } from '@/lib/menu'
import { useGlobalState } from '@/providers/globalProvider'
import { productTypeMap } from '@/lib/maps'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState()
    const { loginInfo } = useGlobalState()
    const botOpts = computed(() =>
      loginInfo.value?.bots.map((t) => ({
        label: `${productTypeMap[t.product_type_id]}(${t.GUID})`,
        value: t.GUID,
      })),
    )
    return { isMiniSidebar, menuList, botMenus, botOpts }
  },
})
</script>

<style scoped lang="scss"></style>
