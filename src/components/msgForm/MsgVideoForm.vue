<script lang="ts">
import useImgSizeCheck from '@/hooks/useImgSizeCheck'
import { computed, defineComponent, PropType, watch } from 'vue'
import { ImgUploadRes, MsgVideoFields } from '../types'

export default defineComponent({
  props: {
    form: {
      type: Object as PropType<MsgVideoFields>,
      default: () => ({ imgRes: null, videoFile: null } as MsgVideoFields),
    },
  },
  setup(props, { emit }) {
    const imgSizeCheck = useImgSizeCheck()
    const formData = computed({
      get: () => props.form,
      set: (val) => emit('update:form', val),
    })
    watch(
      () => formData.value,
      (newData) => {
        console.log(newData)
      },
    )
    const plusData = {
      type: 'file',
      from: 'message',
      path: `xxx`,
    }

    const handleImgBeforeUpload = (file: File) => imgSizeCheck(file, 1, 'MB')
    const handleVideoBeforeUpload = (file: File) => imgSizeCheck(file, 30, 'MB')

    const handleImgSuccessUpload = (res: ImgUploadRes) => {
      formData.value = { ...formData.value, imgRes: res }
    }
    const handleVideoSuccessUpload = (res: ImgUploadRes) => {
      formData.value = { ...formData.value, videoRes: res }
    }
    return {
      formData,
      uploadPath: `${import.meta.env.VITE_API_BASE_URL}/uploadFile/store`,
      plusData,
      handleImgSuccessUpload,
      handleVideoSuccessUpload,
      handleImgBeforeUpload,
      handleVideoBeforeUpload,
    }
  },
})
</script>

<template>
  <el-form :model="formData" ref="form" label-position="top" label-width="80px">
    <el-form-item label="影片">
      <el-upload
        name="file"
        drag
        :action="uploadPath"
        :data="plusData"
        with-credentials
        :on-success="handleVideoSuccessUpload"
        accept="video/mp4"
        :limit="1"
        :before-upload="handleVideoBeforeUpload"
        class="w-full"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="text-gray-400 text-sm">
            影片格式：MP4<br />
            檔案容量：30MB以下
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="預覽圖">
      <el-upload
        name="file"
        drag
        :action="uploadPath"
        :data="plusData"
        with-credentials
        :on-success="handleImgSuccessUpload"
        accept="image/jpeg, image/png"
        :limit="1"
        :before-upload="handleImgBeforeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="text-gray-400 text-sm">
            檔案格式：JPG、JPEG、PNG<br />
            檔案容量：1MB以下<br />
            可上傳的最大圖片寬x高: 尺寸為 1040px × 1040px
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
