<template>
  <div v-if="visible" class="absolute top-0 left-0 ml-36 w-72 z-10">
    <div class="fixed top-0 left-0 w-full h-full" @click="onCancel"></div>
    <div class="bg-white border border-gray-50 shadow-lg p-5">
      <div class="mb-4">
        <div class="">編輯頭貼與暱稱</div>
        <div class="text-gray-400 text-xs">顯示方式會是 "暱稱 from 官方帳號名稱"</div>
      </div>
      <div class="">
        <el-form label-position="top">
          <el-form-item label="回覆暱稱">
            <el-input v-model="localName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <template #label>
              <span>頭貼</span>
              <span class="text-gray-400 text-xs ml-1">(檔案格式限png,大小1mb,建議比例1:1)</span>
            </template>
            <div
              class="
                border border-dashed border-gray-300
                h-32
                w-32
                rounded-lg
                cursor-pointer
                grid
                place-content-center
                mx-auto
                my-2
              "
            >
              <div class="text-center text-gray-400">
                <i class="fas fa-image fa-2x"></i>
                <div class="text-sm">上傳檔案</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="flex gap-x-4 justify-center mt-6">
              <el-button @click="onCancel">取消</el-button> <el-button type="primary" @click="onSubmit">儲存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    name: String,
    visible: Boolean,
  },
  emits: ['update:visible', 'update:name'],
  setup(props, { emit }) {
    const localName = ref(props.name)
    const onSubmit = () => {
      emit('update:name', localName)
      emit('update:visible', false)
    }
    const onCancel = () => {
      localName.value = props.name
      emit('update:visible', false)
    }
    return {
      onCancel,
      onSubmit,
      localName,
    }
  },
})
</script>
<style lang=""></style>
