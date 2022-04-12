<template>
  <el-breadcrumb separator="/" class="mb-2">
    <el-breadcrumb-item :to="{ path: '/' }" class="hidden sm:block">
      <i class="fas fa-home"></i>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="route in breadcrumb.filter((t) => (isMobile ? !t.mobileHidden : true))"
      :key="route.name"
    >
      <router-link v-if="route.path" :to="{ path: route.path }">{{ route.name }}</router-link>
      <span v-else>{{ route.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
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
