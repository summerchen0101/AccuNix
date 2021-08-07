<template>
  <div class="flex flex-col h-full">
    <Header />
    <Sidebar />
    <div
      class="
        transition-all
        relative
        flex flex-col
        ml-0
        mt-14
        h-full
        overflow-y-hidden
      "
      :class="isMiniSidebar ? 'md:ml-12' : 'md:ml-64'"
    >
      <div class="bg-gray-100 flex-1 overflow-y-auto static"><slot></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Layout/Header.vue";
import Sidebar from "@/components/Layout/Sidebar.vue";
import { useLayoutState } from "@/providers/layoutProvider";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  components: {
    Header,
    Sidebar,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState();
    return { isMiniSidebar };
  },
});
</script>

<style scoped lang="scss"></style>
