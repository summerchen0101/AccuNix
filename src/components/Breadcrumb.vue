<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(route, i) in routes"
      :key="i"
      :to="route.path && { path: route.path }"
      >{{ route.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
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
