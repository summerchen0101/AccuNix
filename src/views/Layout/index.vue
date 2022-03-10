<template>
  <div class="flex flex-col h-full">
    <Sidebar />
    <div
      class="transition-all relative flex flex-col ml-0 h-full overflow-y-hidden"
      :class="isMiniSidebar ? 'ml-12' : 'md:ml-52'"
    >
      <Header />
      <div class="bg-gray-100 flex-1 overflow-y-auto static">
        <transition name="fade">
          <router-view v-if="botStore.botApiPath"></router-view>
          <Spinner v-else />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/views/Layout/components/Header.vue'
import Sidebar from '@/views/Layout/components/Sidebar.vue'
import { useBotStore } from '@/service/store/botStore'
import { useLayoutState } from '@/providers/layoutProvider'
import useLoginInfo from '@/service/api/useLoginInfo'
import { defineComponent, onMounted, watchEffect } from 'vue'
import Spinner from '@/components/Spinner.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Sidebar,
    Spinner,
  },
  setup(props) {
    const { isMiniSidebar } = useLayoutState()
    const botStore = useBotStore()
    const { fetchData } = useLoginInfo()
    onMounted(() => {
      fetchData()
    })
    return { isMiniSidebar, botStore }
  },
})
</script>

<style scoped lang="scss"></style>
