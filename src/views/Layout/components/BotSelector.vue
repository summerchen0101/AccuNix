<template>
  <DropBg v-model:is-open="isOpen" />
  <div class="relative px-2">
    <div
      class="border-b border-gray-400 py-2 flex items-center justify-between mb-5 cursor-pointer hover:bg-gray-50"
      @click="isOpen = !isOpen"
    >
      <div class="text-sm truncate">
        <img :src="bot?.picture" class="rounded-full w-7 h-7 inline-block mr-2" alt="" />
        {{ bot?.name }}
      </div>
      <i class="fas fa-angle-down px-2"></i>
    </div>
    <div class="absolute top-0 mt-11 w-[calc(100%-15px)] pt-1" :hidden="!isOpen">
      <div class="bg-white rounded text-sm space-y-1.5 shadow-lg py-3">
        <div
          v-for="t in botList"
          :key="t.GUID"
          class="cursor-pointer hover:bg-gray-100 p-0.5 px-3"
          @click="onChange(t)"
        >
          {{ t.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Bot } from '@/service/api/useLoginInfo'
import { useBotStore } from '@/service/store/botStore'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
import DropBg from '@/components/DropBg.vue'

export default defineComponent({
  setup(props) {
    const isOpen = ref(false)
    const { botList, bot } = storeToRefs(useBotStore())
    const onChange = (newBot: Bot) => {
      bot.value = newBot
      isOpen.value = false
    }
    return { botList, bot, isOpen, onChange }
  },
  components: { DropBg },
})
</script>

<style scoped lang="scss"></style>
