<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutProvider } from './providers/layoutProvider'
import { useGlobalProvider } from './providers/globalProvider'

export default defineComponent({
  setup() {
    useLayoutProvider()
    useGlobalProvider()
  },
})
</script>

<template>
  <router-view />
</template>

<style lang="scss"></style>
