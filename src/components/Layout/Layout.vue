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
        mt-24
        h-full
        overflow-y-hidden
      "
      :class="isMiniSidebar ? 'md:ml-12' : 'md:ml-52'"
    >
      <div class="bg-gray-100 flex-1 overflow-y-auto static"><slot></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Layout/Header.vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import useLoginInfo from '@/service/useLoginInfo'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Sidebar,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState()
    const { fetchData } = useLoginInfo()
    onMounted(() => {
      fetchData()
    })
    return { isMiniSidebar }
  },
})
</script>

<style scoped lang="scss"></style>
