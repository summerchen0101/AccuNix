<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import Layout1 from '@/components/inbox/gridbox/Layout1.vue'
export default defineComponent({
  props: {
    visible: Boolean,
    selected: Number,
  },
  components: {
    Layout1,
  },
  emits: ['update:visible', 'update:selected'],
  setup(props, { emit }) {
    const localSelected = ref<number>()
    watchEffect(() => {
      localSelected.value = props.selected
    })
    const handleConfirm = () => {
      emit('update:selected', localSelected.value)
      emit('update:visible', false)
    }
    return { localSelected, handleConfirm }
  },
})
</script>

<template>
  <el-dialog
    :modelValue="visible"
    @close="$emit('update:visible', false)"
    title="選擇版型"
  >
    <div class="grid grid-cols-3 gap-6">
      <div
        v-for="t in 8"
        :key="t"
        class="w-full h-24 p-3 relative"
        :class="{
          'bg-gray-100': t === localSelected,
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
        <Layout1 is-demo />
      </div>
    </div>
    <template #footer>
      <div class="space-x-3">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm">套用</el-button>
      </div>
    </template>
  </el-dialog>
</template>
