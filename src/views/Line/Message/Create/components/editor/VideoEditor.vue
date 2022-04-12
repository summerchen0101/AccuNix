<template>
  <h3 class="mb-4">影片</h3>
  <el-form :form="form" label-position="top">
    <el-form-item>
      <div class="flex items-center gap-2 relative mb-4">
        <div class="bg-gray-100 w-10 h-10 rounded-full"></div>
        <div class="text-sm text-gray-700">{{ nickname }}</div>
        <i class="fas fa-pen text-sm cursor-pointer" @click="isShowNicknameEditor = true"></i>
        <NicknameSetter v-model:visible="isShowNicknameEditor" v-model:name="nickname" />
      </div>
    </el-form-item>
    <el-form-item>
      <template #label>
        上傳預覽圖
        <span class="text-gray-400 text-xs">(圖片尺寸最大寬1040px x 高1040px, 大小10MB內, 格式JPG、JPEG、PNG)</span>
      </template>

      <ImgUpload v-model="form.img" width="16rem" height="10rem" />
    </el-form-item>
    <el-form-item>
      <template #label>
        上傳影片
        <span class="text-gray-400 text-xs">(影片大小10MB內, 格式MP4)</span>
      </template>
      <VideoUpload v-model:video="form.video" v-model:snapshot="form.img" width="16rem" height="10rem" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import ImgUpload from '@/components/ImgUpload.vue'
import { ImgMsg, VideoMsg } from '@/service/store/msgStore'
import { computed, defineComponent, PropType, ref } from 'vue'
import NicknameSetter from '../NicknameSetter.vue'
import VideoUpload from '@/components/VideoUpload.vue'

export default defineComponent({
  props: {
    targetMsg: Object as PropType<VideoMsg>,
  },
  emits: ['update:targetMsg'],
  setup(props, { emit }) {
    const isShowNicknameEditor = ref(false)
    const nickname = ref('Summer')
    const form = computed<VideoMsg>({
      get: () => props.targetMsg,
      set: (data) => emit('update:targetMsg', data),
    })

    return { isShowNicknameEditor, nickname, form }
  },
  components: { NicknameSetter, ImgUpload, VideoUpload },
})
</script>
<style></style>
