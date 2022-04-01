<template>
  <el-upload
    :http-request="handleFileUpload"
    :show-file-list="false"
    :on-success="onSuccess"
    :before-upload="beforeUpload"
  >
    <LoadingCover :is-loading="isLoading">
      <div class="bg-white rounded-md shadow-md p-3 h-64 w-64 border border-gray-200">
        <div class="border border-dashed border-gray-300 h-full w-full grid place-items-center rounded-md relative">
          <img v-if="modelValue" :src="modelValue" class="absolute top-0 left-0 w-full h-full object-cover" alt="" />
          <div>
            <i class="far fa-image fa-3x text-gray-300"></i>
          </div>
        </div>
      </div>
    </LoadingCover>
  </el-upload>
</template>
<script lang="ts">
import useAlert from '@/hooks/useAlert'
import useImgUpload from '@/service/api/useImgUpload'
import { useBotStore } from '@/service/store/botStore'
import { getImageInfo } from '@/utils'
import { ElUploadRequestOptions } from 'element-plus/lib/el-upload/src/upload.type'
import { defineComponent, ref } from 'vue'
import LoadingCover from './LoadingCover.vue'

export default defineComponent({
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
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
      const imgInfo = await getImageInfo(file)
      const result = imgInfo.width < 1040 && imgInfo.height < 1040
      if (!result) {
        alert(`圖片尺寸錯誤`, 'error')
        return
      }
      emit('update:modelValue', imgInfo.src)
    }
    const handleFileUpload = async ({ file }: ElUploadRequestOptions) => {
      const formData = new FormData()
      formData.append('type', 'file')
      formData.append('from', 'richmenu')
      formData.append('path', `org/${botStore.orgGuid}/line/${botStore.botGuid}/Richmenu`)
      formData.append('file', file)
      const res = await doUpload(formData)
      if (res.path) {
        emit('update:modelValue', res.path)
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
