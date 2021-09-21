<script lang="ts">
import { computed, defineComponent, defineEmits, PropType, watch } from 'vue'
import { MsgImgFields, ImgUploadRes } from '../types'

const emit = defineEmits(['update:form'])
export default defineComponent({
  props: {
    form: {
      type: Object as PropType<MsgImgFields>,
      default: () => ({ file: null } as MsgImgFields),
    },
  },
  setup(props, { emit }) {
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

    const handleSuccessUpload = (res: ImgUploadRes, file: File) => {
      console.log(file)
      console.log(res)
      formData.value = { ...formData.value, imgRes: res }
    }
    return {
      formData,
      uploadPath: `${import.meta.env.VITE_API_BASE_URL}/uploadFile/store`,
      plusData,
      handleSuccessUpload,
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
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg/png 文件，且不超过 500kb
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
