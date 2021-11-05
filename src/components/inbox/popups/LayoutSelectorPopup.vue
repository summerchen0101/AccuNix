<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import InboxLayout from '../InboxLayout.vue'
export default defineComponent({
  props: {
    visible: Boolean,
    selected: Number,
    size: String,
  },
  components: {
    InboxLayout,
  },
  emits: ['update:visible', 'update:selected'],
  setup(props, { emit }) {
    const layouts = ref([...Array(17)].map((_, i) => i + 1))
    const localSelected = ref<number>()

    const init = () => {
      localSelected.value = props.selected
    }
    watchEffect(() => {
      init()
    })
    const handleConfirm = () => {
      emit('update:selected', localSelected.value)
      emit('update:visible', false)
    }
    const handleCancel = () => {
      init()
      emit('update:visible', false)
    }
    return { localSelected, handleConfirm, handleCancel, layouts }
  },
})
</script>

<template>
  <el-dialog
    :modelValue="visible"
    @close="handleCancel"
    title="選擇版型"
    :width="750"
  >
    <div v-if="size === '2500x1686'" class="grid grid-cols-4 gap-6">
      <div
        v-for="(t, i) in layouts.slice(0, 12)"
        :key="t"
        class="w-[153.5px] h-28 p-3 relative"
        :class="{
          'bg-yellow-100': t === localSelected,
        }"
        @click="localSelected = t"
      >
        <div class="grid-box-num">
          {{ i + 1 }}
        </div>
        <InboxLayout is-demo :height="86" :width="127.51" :layout="t" />
      </div>
    </div>
    <div v-else class="grid grid-cols-3 gap-6">
      <div
        v-for="(t, i) in layouts.slice(12, layouts.length)"
        :key="t"
        class="w-full h-24 p-3 relative"
        :class="{
          'bg-yellow-100': t === localSelected,
        }"
        @click="localSelected = t"
      >
        <div class="grid-box-num">
          {{ i + 1 }}
        </div>
        <component :is="`Layout${t}`" is-demo />
      </div>
    </div>
    <template #footer>
      <div class="space-x-3">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">套用</el-button>
      </div>
    </template>
  </el-dialog>
</template>
