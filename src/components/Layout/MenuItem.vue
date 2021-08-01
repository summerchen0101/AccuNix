<template>
  <li v-if="menu.subs">
    <a
      href="#"
      class="bg-blue-500 px-3.5 h-10 flex items-center menu-item"
      @click="isSubOpen = !isSubOpen"
    >
      <div class="flex-1">
        <i class="fas w-10" :class="menu.icon"></i>
        <span class="transition-all text-sm">{{ menu.label }}</span>
      </div>
      <i class="el-icon-arrow-down"></i>
    </a>
    <ul
      class="transition-all max-h-0 overflow-y-hidden bg-gray-500"
      :class="isSubOpen && 'show'"
    >
      <MenuItem v-for="m in menu.subs" :key="m.label" :menu="m" />
    </ul>
  </li>
  <li v-else-if="menu.path">
    <router-link
      class="bg-blue-500 px-3.5 h-10 flex items-center"
      :to="menu.path"
    >
      <i class="fas w-10" :class="menu.icon"></i>
      <span class="transition-all text-sm">{{ menu.label }}</span>
    </router-link>
  </li>
</template>

<script lang="ts">
import { useLayoutState } from "../../providers/layoutProvider";
import { defineComponent, PropType, ref } from "vue";
import { Menu } from "./Sidebar.vue";

export default defineComponent({
  name: "MenuItem",
  components: {},
  props: {
    menu: {
      type: Object as PropType<Menu>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState();
    const isSubOpen = ref(false);

    return { isSubOpen, isMiniSidebar };
  },
});
</script>

<style scoped lang="scss"></style>
