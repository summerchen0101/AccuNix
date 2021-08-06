<template>
  <div
    class="
      bg-gray-200
      flex
      items-center
      px-3
      h-10
      border-b border-gray-300
      absolute
      top-0
      w-full
      z-10
    "
  >
    <Breadcrumb />
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHeader",
  components: {
    Breadcrumb,
  },
  setup(props) {
    //
  },
});
</script>

<style scoped lang="scss"></style>
