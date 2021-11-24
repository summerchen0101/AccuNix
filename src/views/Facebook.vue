<script lang="ts">
import PageHeader from '@/components/Layout/PageHeader.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import { defineComponent, onMounted } from 'vue'
import Layout from '@/components/Layout/Layout.vue'

export default defineComponent({
  components: {
    PageHeader,
    Layout,
  },
  setup() {
    const { activePage } = useLayoutState()
    onMounted(() => {
      activePage.value = 'Facebook'
    })
    return {}
  },
})
</script>

<template>
  <Layout>
    <PageHeader />
    <div class="p-3 mt-10">hello</div>
  </Layout>
</template>
