<template>
  <el-upload
    :http-request="handleFileChanged"
    :show-file-list="false"
    :on-success="onSuccess"
    :before-upload="beforeUpload"
    accept=".mp4"
    action=""
  >
    <LoadingCover :is-loading="isLoading">
      <div class="bg-white rounded-md shadow-md p-3 h-64 w-64 border border-gray-200 group" :style="{ width, height }">
        <div class="border border-dashed border-gray-300 h-full w-full grid place-items-center rounded-md relative">
          <video
            v-if="video"
            :src="video"
            class="absolute top-0 left-0 w-full h-full object-cover"
            alt=""
            controls
            autoplay
          ></video>
          <div>
            <i class="fas fa-film fa-3x text-gray-300"></i>
          </div>
          <!-- <div
            class="
              absolute
              top-0
              left-0
              bg-black/40
              h-full
              w-full
              hidden
              group-hover:grid
              place-items-center
              text-white
            "
          >
            <div class="flex items-center gap-1">
              <i class="fas fa-arrow-circle-up text-xl"></i>
              重新上傳
            </div>
          </div> -->
        </div>
      </div>
    </LoadingCover>
  </el-upload>
</template>
<script lang="ts">
import useAlert from '@/hooks/useAlert'
import useImgUpload from '@/service/api/useImgUpload'
import { useBotStore } from '@/service/store/botStore'
import { ElUploadRequestOptions } from 'element-plus/lib/el-upload/src/upload.type'
import VideoSnapshot from 'video-snapshot'
import { defineComponent } from 'vue'
import LoadingCover from './LoadingCover.vue'

export default defineComponent({
  props: {
    video: String,
    width: [Number, String],
    height: [Number, String],
    snapshot: String,
  },
  emits: ['update:snapshot', 'update:video'],
  setup(props, { emit }) {
    const botStore = useBotStore()
    const alert = useAlert()
    const onSuccess = () => {
      //
    }
    const beforeUpload = () => {
      //
    }
    const { doUpload, isLoading } = useImgUpload()
    const handleFileChanged = async ({ file }: ElUploadRequestOptions) => {
      let blobURL = URL.createObjectURL(file)
      emit('update:video', blobURL)
      const snapshoter = new VideoSnapshot(file)
      const previewSrc = await snapshoter.takeSnapshot()
      emit('update:snapshot', previewSrc)
    }
    const handleFileUpload = async ({ file }: ElUploadRequestOptions) => {
      const formData = new FormData()
      formData.append('type', 'file')
      formData.append('from', 'richmenu')
      formData.append('path', `org/${botStore.orgGuid}/line/${botStore.botGuid}/Richmenu`)
      formData.append('file', file)
      const res = await doUpload(formData)
      if (res.path) {
        emit('update:snapshot', res.path)
      }
    }
    return {
      onSuccess,
      beforeUpload,
      handleFileUpload,
      handleFileChanged,
      isLoading,
    }
  },
  components: { LoadingCover },
})
</script>
<style lang=""></style>
