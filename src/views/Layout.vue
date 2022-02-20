<script lang="ts">
import Layout from '@/components/Layout/Layout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>
