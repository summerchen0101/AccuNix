<template>
  <ul class="breadcrumb text-sm flex items-center text-primary-100">
    <li><i class="fas fa-home text-base"></i></li>
    <li>LINE-51f123abe</li>
    <li>機器人主選單</li>
  </ul>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(route, i) in routes"
      :key="i"
      :to="route.path && { path: route.path }"
      >{{ route.name }}</el-breadcrumb-item
    >
  </el-breadcrumb> -->
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface RouteProps {
  path?: string
  name: string
}
export default defineComponent({
  props: {
    routes: Array as PropType<RouteProps[]>,
  },
  setup() {
    //
  },
})
</script>
