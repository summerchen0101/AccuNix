<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutProvider } from './providers/layoutProvider'
import { useLineBotProvider } from './providers/lineBotProvider'

export default defineComponent({
  setup() {
    useLayoutProvider()
    useLineBotProvider()
  },
})
</script>

<template>
  <router-view />
</template>

<style lang="scss"></style>
