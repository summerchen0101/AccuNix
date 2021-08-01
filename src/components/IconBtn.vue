<template>
  <div
    class="
      text-white
      rounded-full
      w-8
      h-8
      flex
      justify-center
      items-center
      cursor-pointer
      hover:scale-110
    "
  >
    <i class="fas" :class="[`fa-${icon}`, color]"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    color: String,
  },
  setup(props) {
    //
  },
});
</script>
