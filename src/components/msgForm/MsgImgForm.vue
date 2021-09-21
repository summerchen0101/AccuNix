<script lang="ts">
import useImgSizeCheck from '@/hooks/useImgSizeCheck'
import { computed, defineComponent, PropType, watch } from 'vue'
import { ImgUploadRes, MsgImgFields } from '../types'

export default defineComponent({
  props: {
    form: {
      type: Object as PropType<MsgImgFields>,
      default: () => ({ file: null } as MsgImgFields),
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

    const handleBeforeUpload = (file: File) => imgSizeCheck(file, 2, 'MB')

    const handleSuccessUpload = (res: ImgUploadRes) => {
      formData.value = { ...formData.value, imgRes: res }
    }
    return {
      formData,
      uploadPath: `${import.meta.env.VITE_API_BASE_URL}/uploadFile/store`,
      plusData,
      handleSuccessUpload,
      handleBeforeUpload,
    }
  },
})
</script>

<template>
  <el-form :model="formData" ref="form" label-position="top" label-width="80px">
    <el-form-item>
      <el-upload
        name="file"
        drag
        :action="uploadPath"
        :data="plusData"
        with-credentials
        :on-success="handleSuccessUpload"
        accept="image/jpeg, image/png"
        :limit="1"
        :before-upload="handleBeforeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="text-gray-400 text-sm">
            檔案格式：JPG、JPEG、PNG<br />
            檔案容量：2MB以下<br />
            可上傳的最大圖片寬x高: 尺寸為 4096px × 4096px
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
