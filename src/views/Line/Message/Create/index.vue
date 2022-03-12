<template>
  <div class="p-3">
    <div class="text-xl text-gray-600 tracking-wider py-3">新增訊息</div>
    <div class="bg-white rounded-md shadow-md p-8 flex gap-x-10">
      <div class="flex flex-col items-center w-[350px]">
        <div class="bg-white border border-gray-50 shadow-xl rounded-3xl p-4 h-[580px] w-[300px] relative">
          <div class="bg-white rounded-lg h-8 w-36 absolute top-0 left-[calc(150px-4.5rem)]"></div>
          <div class="bg-gray-200 h-full rounded-3xl relative pt-20 px-4">
            <div class="border-t border-gray-400 relative">
              <div
                class="
                  fas
                  fa-plus-circle
                  text-primary-400
                  absolute
                  top-0
                  left-0
                  ml-[calc(50%-7px)]
                  -mt-3.5
                  bg-gray-200
                  text-xl
                  cursor-pointer
                "
                @click="isShowMsgTypeSelector = true"
              ></div>
            </div>
            <MsgTypeSelector v-model:visible="isShowMsgTypeSelector" v-model="msgType" />
          </div>
        </div>
        <el-button class="mt-6">加入常用訊息</el-button>
      </div>
      <div class="flex-1 bg-gray-50"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import MsgTypeSelector from './components/MsgTypeSelector.vue'

export default defineComponent({
  setup() {
    const msgType = ref('')
    const isShowMsgTypeSelector = ref(false)
    watchEffect(() => {
      console.log(msgType.value)
    })
    return { msgType, isShowMsgTypeSelector }
  },
  components: { MsgTypeSelector },
})
</script>
<style></style>
