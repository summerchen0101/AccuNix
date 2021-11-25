<template>
  <li>
    <template v-if="menu.subs">
      <a
        href="#"
        class="px-3.5 h-12 flex items-center menu-item"
        @click="isSubOpen = !isSubOpen"
      >
        <div class="flex-1">
          <i class="fas w-10" :class="menu.icon"></i>
          <span class="transition-all text-base">{{ menu.label }}</span>
        </div>
        <i class="el-icon-arrow-down"></i>
      </a>
      <ul
        class="transition-all max-h-0 overflow-y-hidden bg-white/20"
        :class="isSubOpen && 'show'"
      >
        <MenuItem v-for="m in menu.subs" :key="m.label" :menu="m" />
      </ul>
    </template>
    <router-link
      v-else-if="menu.path"
      class="px-3.5 h-12 flex items-center"
      :class="isActive && 'bg-warning-500 text-gray-600 font-semibold'"
      :to="menu.path"
    >
      <i class="fas w-10" :class="menu.icon"></i>
      <span class="transition-all text-base">{{ menu.label }}</span>
    </router-link>
  </li>
</template>

<script lang="ts">
import { useLayoutState } from '@/providers/layoutProvider'
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue'
import { Menu } from '@/lib/menu'

export default defineComponent({
  name: 'MenuItem',
  components: {},
  props: {
    menu: {
      type: Object as PropType<Menu>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { isMiniSidebar, activePage } = useLayoutState()
    const isSubOpen = ref(false)

    const checkActive = (menu: Menu): boolean => {
      if (menu.subs) {
        return menu.subs.some((m) => checkActive(m))
      }
      return menu.code === activePage.value
    }
    const isActive = computed(() => checkActive(props.menu))

    watchEffect(() => {
      if (isActive.value && props.menu.subs) {
        isSubOpen.value = true
      }
    })

    return { isSubOpen, isMiniSidebar, isActive }
  },
})
</script>

<style scoped lang="scss"></style>
