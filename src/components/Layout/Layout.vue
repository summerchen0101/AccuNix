<template>
  <div class="flex flex-col h-full">
    <Sidebar />
    <div
      class="
        transition-all
        relative
        flex flex-col
        ml-0
        h-full
        overflow-y-hidden
      "
      :class="isMiniSidebar ? 'md:ml-12' : 'md:ml-52'"
    >
      <Header />
      <div class="bg-gray-100 flex-1 overflow-y-auto static">
        <transition name="fade">
          <slot v-if="botApiPath"></slot>
          <Spinner v-else />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Layout/Header.vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import useLoginInfo from '@/service/api/useLoginInfo'
import { defineComponent, onMounted } from 'vue'
import Spinner from '../Spinner.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Sidebar,
    Spinner,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState()
    const { botApiPath } = useGlobalState()
    const { fetchData } = useLoginInfo()
    onMounted(() => {
      fetchData()
    })
    return { isMiniSidebar, botApiPath }
  },
})
</script>

<style scoped lang="scss"></style>
