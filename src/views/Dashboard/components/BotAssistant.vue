<script lang="ts">
import useBotUpdate from '@/service/api/useBotUpdate'
import { Bot } from '@/service/api/useLoginInfo'
import { defineComponent, PropType, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    bot: Object as PropType<Bot>,
  },
  setup(props) {
    const isEdit = ref(false)
    const notes = ref('')
    watchEffect(() => {
      notes.value = props.bot.description
    })
    const { doUpdate, isLoading } = useBotUpdate()
    return { doUpdate, isLoading, isEdit, notes }
  },
})
</script>

<template>
  <div class="flex-1">
    <div class="font-medium text-base">
      Line Assistant
      <span class="float-right text-blue-400 text-sm">下載好友資訊</span>
    </div>
    <div class="flex space-x-5 py-3">
      <div>標籤額度： {{ bot?.tagCount }}/{{ bot?.tagQuota }}</div>
      <div>加入好友： {{ bot?.followers }}</div>
      <div>封鎖好友： {{ bot?.blocks }}</div>
    </div>
    <div class="mt-2 flex gap-2">
      備註：
      <div v-if="isEdit" class="">
        <el-input size="small" v-model="notes" />
        <a class="cursor-pointer hover:text-gray-500" @click="isEdit = false"><i class="fas fa-edit"></i></a>
      </div>
      <div v-else class="">
        {{ bot?.description || '-' }}
        <a class="cursor-pointer hover:text-gray-500" @click="isEdit = true"><i class="fas fa-edit"></i></a>
      </div>
    </div>
  </div>
</template>
