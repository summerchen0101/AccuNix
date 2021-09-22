<script lang="ts">
import useImgSizeCheck from '@/hooks/useImgSizeCheck'
import { computed, defineComponent, PropType, watch } from 'vue'
import { ImgUploadRes, CardGroup } from '../types'

export default defineComponent({
  props: {
    form: {
      type: Object as PropType<CardGroup>,
      default: () =>
        ({ file: null, title: '', content: '', btns: [] } as CardGroup),
    },
  },
  setup(props, { emit }) {
    const imgSizeCheck = useImgSizeCheck()
    const formData = computed({
      get: () => props.form,
      set: (val) => emit('update:form', val),
    })

    const plusData = {
      type: 'file',
      from: 'message',
      path: `xxx`,
    }

    const handleBeforeUpload = (file: File) => imgSizeCheck(file, 2, 'MB')

    const handleSuccessUpload = (res: ImgUploadRes) => {
      formData.value = { ...formData.value, imgRes: res }
    }

    const handleBtnClose = (index: number) => {
      formData.value.btns.splice(index, 1)
    }
    return {
      formData,
      uploadPath: `${import.meta.env.VITE_API_BASE_URL}/uploadFile/store`,
      plusData,
      handleSuccessUpload,
      handleBeforeUpload,
      handleBtnClose,
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
    <el-form-item label="圖卡標題">
      <el-input placeholder="请输入圖卡標題" v-model="formData.title" />
    </el-form-item>
    <el-form-item label="圖卡內容">
      <el-input
        type="textarea"
        placeholder="请输入圖卡內容"
        v-model="formData.content"
        maxlength="100"
        show-word-limit
      />
    </el-form-item>
    <div
      v-for="(btn, i) in formData.btns"
      :key="i"
      class="bg-gray-100 p-3 relative mx-3 mb-5"
    >
      <div
        class="
          absolute
          top-0
          left-0
          rounded-full
          bg-gray-400
          text-white
          w-6
          h-6
          text-center
          -m-2
        "
      >
        {{ i + 1 }}
      </div>
      <!-- <div
        :hidden="formData.btns.length <= 1"
        class="
          absolute
          top-0
          right-0
          rounded-full
          bg-red-400
          text-white
          w-6
          h-6
          text-center
          -m-2
          cursor-pointer
        "
        @click="() => handleBtnClose(i)"
      >
        <i class="fas fa-times"></i>
      </div> -->
      <el-form-item label="按鈕標題">
        <el-input placeholder="请输入按鈕標題" v-model="btn.title" />
      </el-form-item>
      <el-form-item label="按鈕動作">
        <el-select placeholder="请選擇" v-model="btn.action" />
      </el-form-item>
      <el-form-item label="按鈕回覆文字">
        <el-input placeholder="请输入按鈕回覆文字" v-model="btn.reply" />
      </el-form-item>
    </div>
  </el-form>
</template>
