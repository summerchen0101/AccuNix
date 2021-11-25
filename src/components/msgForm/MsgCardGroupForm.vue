<script lang="ts">
import produce from 'immer'
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
  toRefs,
  watchEffect,
} from 'vue'
import { MsgCardGroupFields } from '../types'
import CardGroupItemForm from './CardGroupItemForm.vue'

export default defineComponent({
  components: {
    CardGroupItemForm,
  },
  props: {
    form: {
      type: Object as PropType<MsgCardGroupFields>,
      default: () =>
        ({
          review: '',
          btnCount: 1,
          groups: [
            {
              file: null,
              title: '',
              content: '',
              btns: [{ title: '', action: 1, reply: '' }],
            },
          ],
        } as MsgCardGroupFields),
    },
  },
  setup(props, { emit }) {
    const activeGroupIndex = ref('0')
    const formData = computed({
      get: () => props.form,
      set: (val) => emit('update:form', val),
    })
    const onTabRemove = (targetIndex: number) => {
      formData.value.groups.splice(targetIndex, 1)
      activeGroupIndex.value = (
        targetIndex - 1 >= 0 ? targetIndex - 1 : 0
      ).toString()
    }
    const handleCardCreate = () => {
      const btns = Array(formData.value.btnCount).fill({
        title: '按鈕',
        action: 1,
        reply: '',
      })
      formData.value.groups.push({
        file: null,
        title: '',
        content: '',
        btns,
      })

      activeGroupIndex.value = (formData.value.groups.length - 1).toString()
    }
    watch(
      () => formData.value.btnCount,
      (newVal) => {
        formData.value = {
          ...formData.value,
          groups: formData.value.groups.map((g) => {
            const diff = newVal - g.btns.length
            if (diff > 0) {
              for (let i = 0; i < diff; i++) {
                g.btns.push({ title: '按鈕', action: 1, reply: '' })
              }
            } else {
              g.btns.length = newVal
            }
            return { ...g }
          }),
        }
      },
    )
    return { formData, activeGroupIndex, onTabRemove, handleCardCreate }
  },
})
</script>

<template>
  <el-form :model="formData" ref="form" label-position="top" label-width="80px">
    <el-form-item label="預覽訊息">
      <el-input placeholder="请输入預覽訊息" v-model="formData.review" />
      <p class="text-gray-400">（預覽訊息將顯示於推播通知及聊天列表中）</p>
    </el-form-item>
    <el-form-item label="按鈕數量">
      <el-select v-model="formData.btnCount">
        <el-option
          v-for="num in [...Array(3)].map((t, i) => i + 1)"
          :label="num"
          :value="num"
          :key="num"
        ></el-option>
      </el-select>
      <p class="text-red-400">(*每個圖卡按鈕數量需一致，最多3個)</p>
    </el-form-item>
    <div class="mb-2">
      <button
        type="button"
        @click="handleCardCreate"
        class="
          bg-primary-400
          py-1
          px-2
          rounded
          text-sm text-white
          hover:bg-primary-400/80
        "
      >
        <i class="fas fa-plus"></i> 增加圖卡
      </button>
    </div>
    <div class="max-w-[500px] overflow-x-auto">
      <el-tabs
        type="card"
        v-model="activeGroupIndex"
        :closable="formData.groups.length > 1"
        @tab-remove="onTabRemove"
      >
        <el-tab-pane
          v-for="(g, i) in formData.groups"
          :key="i"
          :label="(i + 1).toString()"
          :name="i.toString()"
        >
          <CardGroupItemForm v-model:form="formData.groups[i]" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-form>
</template>
