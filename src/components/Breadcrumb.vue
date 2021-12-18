<template>
  <ul class="breadcrumb text-sm flex items-center text-primary-100">
    <!-- <li><i class="fas fa-home text-base"></i></li> -->
    <li v-for="route in breadcrumb" :key="route.name">
      <router-link v-if="route.path" :to="{ path: route.path }">{{
        route.name
      }}</router-link>
      <span v-else>{{ route.name }}</span>
    </li>
  </ul>
</template>
<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { breadcrumb } = useGlobalState()
    return { breadcrumb }
  },
})
</script>
