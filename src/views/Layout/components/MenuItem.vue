<template>
  <li class="border-white/10 text-gray-500 hover:text-primary-400 menu-item">
    <!-- 有子項目 -->
    <template v-if="menu.subs">
      <a
        href="#"
        class="px-3.5 h-10 flex items-center"
        @click="isSubOpen = !isSubOpen"
        :class="checkActive(menu) && 'bg-primary-gradient text-white'"
      >
        <i class="w-10" :class="menu.icon"></i>
        <span v-if="!isMiniSidebar" class="transition-all text-sm">{{ menu.label }}</span>
        <div class="flex-1"></div>
        <i v-if="!isMiniSidebar" class="el-icon-arrow-down" :class="isSubOpen && 'rotate-180'"></i>
        <!-- Mini模式的浮動窗 -->
        <div class="relative hidden float-sub text-sm">
          <div class="absolute left-0 top-0 -mt-5 pl-5">
            <ul class="bg-white rounded text-gray-500 whitespace-nowrap shadow-md p-3 space-y-2 w-44">
              <li>{{ menu.label }}</li>
              <li
                v-for="(m, i) in menu.subs"
                :key="i"
                class="ml-4 hover:text-blue-400"
                :class="checkActive(m) && 'text-blue-400'"
              >
                <router-link :to="m.path || '#'">{{ m.label }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </a>
      <ul class="transition-all max-h-0 overflow-y-hidden bg-white-500" :class="isSubOpen && 'show'">
        <MenuItem v-for="m in menu.subs" :key="m.label" :menu="m" :stage="2" />
      </ul>
    </template>
    <!-- 無子項目 -->
    <router-link
      v-else
      class="px-3.5 h-10 flex items-center"
      :class="{
        'text-primary-400 bg-gray-100': isActive && stage !== 1,
        'bg-primary-gradient text-white': isActive && stage === 1,
      }"
      :to="menu.path"
    >
      <i class="w-10" :class="menu.icon"></i>
      <!-- Mini模式的浮動窗 -->
      <div class="relative hidden float-sub text-sm">
        <div class="absolute left-0 top-0 -mt-3 ml-5">
          <div class="bg-black/70 text-white whitespace-nowrap px-3 py-1 rounded">
            {{ menu.label }}
          </div>
        </div>
      </div>
      <span v-if="!isMiniSidebar" class="transition-all text-sm">{{ menu.label }}</span>
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
    stage: {
      type: Number,
      default: 1,
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

    return { isSubOpen, isMiniSidebar, isActive, checkActive }
  },
})
</script>

<style scoped lang="scss"></style>
