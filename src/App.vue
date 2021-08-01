<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLayoutProvider } from "./providers/layoutProvider";

export default defineComponent({
  setup() {
    useLayoutProvider();
  },
});
</script>

<style lang="scss"></style>
