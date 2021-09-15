<template>
  <div
    class="
      bg-blue-400
      text-white
      flex flex-col
      transition-all
      fixed
      z-20
      hover:w-64
      overflow-x-hidden
      h-full
      mt-14
      sidebar
    "
    :class="isMiniSidebar ? 'w-0 md:w-12 mini' : 'w-64 md:w-64'"
  >
    <ul class="w-64">
      <MenuItem v-for="m in menuList" :key="m.label" :menu="m" />
    </ul>
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
import { defineComponent } from 'vue'

export interface Menu {
  label: string
  icon?: string
  path: string | null
  subs?: Menu[]
  code?: string
}
export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState()
    const menuList: Menu[] = [
      { label: '首頁', path: '/', icon: 'fa-home', code: 'Home' },
      {
        label: '聊天機器人',
        path: null,
        icon: 'fa-comments',
        subs: [
          { label: 'Line', path: '/line/setting', code: 'Line' },
          { label: 'Facebook', path: '/facebook', code: 'Facebook' },
        ],
      },
    ]
    return { isMiniSidebar, menuList }
  },
})
</script>

<style scoped lang="scss"></style>
