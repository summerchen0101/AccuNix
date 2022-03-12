<template lang="">
  <div class="p-3">
    <div class="flex gap-2 items-center">
      <div class="text-xl text-gray-600 tracking-wider py-3">訊息列表</div>
      <el-button size="small" type="primary" @click="$router.push({ name: 'LineMessageCreate' })">新增</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
<style lang=""></style>
