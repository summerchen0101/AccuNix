<template>
  <div class="relative h-[580px] w-[290px] m-5 mb-12 scale-75 md:scale-100 origin-top-left">
    <!-- 底圖 -->
    <div class="bg-gray-200 w-full h-full p-4 m-5"></div>
    <!-- 外框 -->
    <div class="phone-frame w-full h-full rounded-3xl drop-shadow-md absolute top-0">
      <!-- 瀏海 -->
      <div class="bg-white rounded-lg h-8 w-36 absolute top-0 left-[calc(145px-4.5rem)] z-10 -mt-3"></div>
    </div>
    <div class="absolute top-0 left-0 ml-5 mt-12 h-[540px] w-[290px]">
      <div class="overflow-y-auto h-full w-full px-4">
        <slot></slot>
        <!-- <div class="w-[600px] h-[300px] bg-red-500/50 absolute top-0 left-0"></div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    return {}
  },
})
</script>
<style>
.phone-frame {
  box-shadow: 0 0 0 20px #fff;
  margin: 20px;
}
.-z-1 {
  z-index: -1;
}
</style>
