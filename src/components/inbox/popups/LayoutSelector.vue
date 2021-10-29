<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import boxLayouts from '@/components/inbox/gridbox'
export default defineComponent({
  props: {
    visible: Boolean,
    selected: Number,
  },
  components: {
    ...boxLayouts,
  },
  emits: ['update:visible', 'update:selected'],
  setup(props, { emit }) {
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
    return { localSelected, handleConfirm, handleCancel }
  },
})
</script>

<template>
  <el-dialog
    :modelValue="visible"
    @close="handleCancel"
    title="選擇版型"
    :width="720"
  >
    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="t in 12"
        :key="t"
        class="w-full h-28 p-3 relative"
        :class="{
          'bg-yellow-100': t === localSelected,
        }"
        @click="localSelected = t"
      >
        <div
          class="
            absolute
            top-0
            left-0
            -ml-2
            -mt-2
            bg-yellow-500
            text-white
            w-5
            h-5
            flex
            justify-center
            items-center
            rounded-full
          "
        >
          {{ t }}
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
