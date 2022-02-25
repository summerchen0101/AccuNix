<script lang="ts">
import { defineComponent, ref, watchEffect, toRefs } from 'vue'
export default defineComponent({
  name: 'InboxLayout',
  props: {
    isDemo: Boolean,
    activeBox: Number,
    boxCount: Number,
    height: Number,
    width: Number,
    layout: Number,
  },
  emits: ['update:activeBox', 'update:boxCount'],
  setup(props, { emit }) {
    const boxs = ref<BoxProps[]>([])
    const { height, width, layout } = toRefs(props)
    watchEffect(() => {
      boxs.value = toLayoutBoxs({
        h: height.value,
        w: width.value,
        layout: layout.value,
      })
    })
    watchEffect(() => {
      emit('update:boxCount', boxs.value.length)
    })
    return { boxs }
  },
})

interface BoxProps {
  x: number
  y: number
  width: number
  height: number
}

export function toLayoutBoxs({ h, w, layout }: { h: number; w: number; layout: number }) {
  const _map: Record<number, BoxProps[]> = {
    1: [
      { x: 0, y: 0, height: h / 2, width: w / 3 },
      {
        x: w / 3,
        y: 0,
        height: h / 2,
        width: w / 3,
      },
      {
        x: (w / 3) * 2,
        y: 0,
        height: h / 2,
        width: w / 3,
      },
      {
        x: 0,
        y: h / 2,
        height: h / 2,
        width: w / 3,
      },
      {
        x: w / 3,
        y: h / 2,
        height: h / 2,
        width: w / 3,
      },
      {
        x: (w / 3) * 2,
        y: h / 2,
        height: h / 2,
        width: w / 3,
      },
    ],
    2: [
      { x: 0, y: 0, height: h / 2, width: w / 2 },
      { x: w / 2, y: 0, height: h / 2, width: w / 2 },
      { x: 0, y: h / 2, height: h / 2, width: w / 2 },
      { x: w / 2, y: h / 2, height: h / 2, width: w / 2 },
    ],
    3: [
      { x: 0, y: 0, height: h / 2, width: w },
      {
        x: 0,
        y: h / 2,
        height: h / 2,
        width: w / 3,
      },
      {
        x: w / 3,
        y: h / 2,
        height: h / 2,
        width: w / 3,
      },
      {
        x: (w / 3) * 2,
        y: h / 2,
        height: h / 2,
        width: w / 3,
      },
    ],
    4: [
      { x: 0, y: 0, height: h, width: w / 2 },
      { x: w / 2, y: 0, height: h / 2, width: w / 2 },
      { x: w / 2, y: h / 2, height: h / 2, width: w / 2 },
    ],
    5: [
      { x: 0, y: 0, height: h / 2, width: w },
      { x: 0, y: h / 2, height: h / 2, width: w },
    ],
    6: [
      { x: 0, y: 0, height: h, width: w / 2 },
      { x: w / 2, y: 0, height: h, width: w / 2 },
    ],
    7: [
      { x: 0, y: 0, height: h / 3, width: w },
      { x: 0, y: h / 3, height: h / 3, width: w },
      { x: 0, y: (h / 3) * 2, height: h / 3, width: w },
    ],
    8: [
      { x: 0, y: 0, height: h / 2, width: w },
      { x: 0, y: h / 2, height: h / 2, width: w / 2 },
      { x: w / 2, y: h / 2, height: h / 2, width: w / 2 },
    ],
    9: [
      { x: 0, y: 0, height: h / 2, width: w },
      { x: 0, y: (h / 4) * 2, height: h / 4, width: w },
      { x: 0, y: (h / 4) * 3, height: h / 4, width: w },
    ],
    10: [{ x: 0, y: 0, height: h, width: w }],
    11: [
      { x: 0, y: 0, height: h / 7, width: w / 2 },
      { x: w / 2, y: 0, height: h / 7, width: w / 2 },
      { x: 0, y: h / 7, height: (h / 7) * 3, width: w / 3 },
      { x: w / 3, y: h / 7, height: (h / 7) * 3, width: w / 3 },
      { x: (w / 3) * 2, y: h / 7, height: (h / 7) * 3, width: w / 3 },
      { x: 0, y: (h / 7) * 4, height: (h / 7) * 3, width: w / 3 },
      { x: w / 3, y: (h / 7) * 4, height: (h / 7) * 3, width: w / 3 },
      { x: (w / 3) * 2, y: (h / 7) * 4, height: (h / 7) * 3, width: w / 3 },
    ],
    12: [
      { x: 0, y: 0, height: h / 7, width: w / 3 },
      { x: w / 3, y: 0, height: h / 7, width: w / 3 },
      { x: (w / 3) * 2, y: 0, height: h / 7, width: w / 3 },
      { x: 0, y: h / 7, height: (h / 7) * 3, width: w / 3 },
      { x: w / 3, y: h / 7, height: (h / 7) * 3, width: w / 3 },
      { x: (w / 3) * 2, y: h / 7, height: (h / 7) * 3, width: w / 3 },
      { x: 0, y: (h / 7) * 4, height: (h / 7) * 3, width: w / 3 },
      { x: w / 3, y: (h / 7) * 4, height: (h / 7) * 3, width: w / 3 },
      { x: (w / 3) * 2, y: (h / 7) * 4, height: (h / 7) * 3, width: w / 3 },
    ],
    13: [
      { x: 0, y: 0, height: h, width: w / 3 },
      { x: w / 3, y: 0, height: h, width: w / 3 },
      { x: (w / 3) * 2, y: 0, height: h, width: w / 3 },
    ],
    14: [
      { x: 0, y: 0, height: h, width: (w / 3) * 2 },
      { x: (w / 3) * 2, y: 0, height: h, width: w / 3 },
    ],
    15: [
      { x: 0, y: 0, height: h, width: w / 3 },
      { x: w / 3, y: 0, height: h, width: (w / 3) * 2 },
    ],
    16: [
      { x: 0, y: 0, height: h, width: w / 2 },
      { x: w / 2, y: 0, height: h, width: w / 2 },
    ],
    17: [{ x: 0, y: 0, height: h, width: w }],
  }

  return _map[layout]
}
</script>

<template>
  <div class="h-full w-full border-box relative">
    <div
      v-for="(box, i) in boxs"
      :key="i"
      class="border-box absolute p-1"
      :class="{ active: activeBox === i + 1 }"
      :style="{
        left: box.x + 'px',
        top: box.y + 'px',
        height: box.height + 'px',
        width: box.width + 'px',
      }"
      @click="$emit('update:activeBox', i + 1)"
    >
      <span v-if="!isDemo">{{ i + 1 }}</span>
    </div>
  </div>
</template>
