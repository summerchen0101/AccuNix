<template>
  <ul class="breadcrumb text-sm flex items-center text-primary-100">
    <li :hidden="isMobile">
      <router-link to="/"><i class="fas fa-home text-base"></i></router-link>
    </li>
    <li
      v-for="route in breadcrumb.filter((t) =>
        isMobile ? t.mobileShow : true,
      )"
      :key="route.name"
    >
      <router-link v-if="route.path" :to="{ path: route.path }">{{
        route.name
      }}</router-link>
      <span v-else>{{ route.name }}</span>
    </li>
  </ul>
</template>
<script lang="ts">
import useMediaQuery from '@/hooks/useMediaQuery'
import { useGlobalState } from '@/providers/globalProvider'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { breadcrumb } = useGlobalState()
    const { isMatch: isMobile } = useMediaQuery('(max-width: 600px)')
    return {
      breadcrumb,
      isMobile,
    }
  },
})
</script>
