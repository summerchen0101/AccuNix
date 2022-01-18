<script lang="ts">
import { useGlobalState } from '@/providers/globalProvider'
import useTagOptCreate, { TagOptCreateReq } from '@/service/useCreateTagOpt'
import { defineComponent, reactive, ref, watchEffect } from 'vue'
enum DayType {
  Forever,
  Limit,
}
export default defineComponent({
  emits: ['finishd'],
  setup(props, { emit }) {
    const { isShowTagPopup } = useGlobalState()
    const { doCreate, isLoading, isError } = useTagOptCreate()
    const data = reactive({
      name: '',
      description: '',
      dayType: DayType.Forever,
      days: '',
    })

    const initData = () => {
      data.name = ''
      data.description = ''
      data.dayType = DayType.Forever
      data.days = ''
    }

    const handleClose = () => {
      isShowTagPopup.value = false
      initData()
    }

    const handleConfirm = async () => {
      const res = await doCreate({
        name: data.name,
        description: data.description,
        days: data.dayType === DayType.Forever ? -1 : +data.days,
      })
      if (!isError.value) {
        emit('finishd')
        handleClose()
      }
    }
    return {
      isShowTagPopup,
      data,
      DayType,
      handleConfirm,
      handleClose,
      isLoading,
    }
  },
})
</script>

<template>
  <el-dialog
    :modelValue="isShowTagPopup"
    @close="handleClose"
    title="建立標籤"
    :width="400"
  >
    <el-form
      v-loading="isLoading"
      :model="data"
      ref="form"
      label-position="top"
      label-width="80px"
    >
      <el-form-item label="標籤名稱" required>
        <el-input v-model="data.name"></el-input>
        <div class="help info">
          <!-- <i class="fas fa-info-circle"></i> -->
          標籤不能使用以下特殊符號：¥[]~' "/\#?=&@%*,+及空白
        </div>
      </el-form-item>
      <el-form-item label="標籤說明">
        <el-input v-model="data.description"></el-input>
      </el-form-item>
      <el-form-item label="有效期限">
        <el-radio v-model="data.dayType" :label="DayType.Forever">永久</el-radio
        ><br />
        <el-radio v-model="data.dayType" :label="DayType.Limit">
          有效天數 (可設定範圍為 1~365 天)
        </el-radio>
        <div class="pl-7">
          <el-input v-model="data.days">
            <template #suffix><span class="mr-2">天</span></template></el-input
          >
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="space-x-3">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">確定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
