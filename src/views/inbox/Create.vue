<script lang="ts">
import actionForms from '@/components/inbox/form'
import boxLayouts from '@/components/inbox/gridbox'
import LayoutSelectorPopup from '@/components/inbox/popups/LayoutSelectorPopup.vue'
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import useAlert from '@/hooks/useAlert'
import { useLayoutState } from '@/providers/layoutProvider'
import { useLineBotState } from '@/providers/lineBotProvider'
import useImgUpload from '@/service/useImgUpload'
import { OptionsType } from '@/types'
import { getImageInfo } from '@/utils'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
// import { MsgBtnFields } from '@/components/types'

export interface ActionForm {
  type: string
  value: string | number
  tags: OptionsType<number>
}
interface IState {
  name: string
  desc: string
  msg: string
  status: number
  menuSize: string
  tags: number[]
  boxsAction: Record<number, ActionForm>
}

export default defineComponent({
  components: {
    Layout,
    PageHeader,
    LayoutSelectorPopup,
    ...boxLayouts,
    ...actionForms,
  },
  setup() {
    const { activePage } = useLayoutState()
    const layoutImgUrl = ref('')
    const alert = useAlert()
    const { lineBotGuid, orgGuid } = useLineBotState()
    const layoutSelectorVisible = ref(false)
    const activeBox = ref<number>(1)
    const selectedLayout = ref<number>(1)
    watch(
      () => selectedLayout.value,
      () => {
        activeBox.value = 1
      },
    )

    const { doUpload, isLoading: isUploadLoading } = useImgUpload()

    const sizeInfo = computed(() => {
      const _size = formData.menuSize.split('x')
      return { w: +_size[0], h: +_size[1] }
    })

    const boxLayout = computed(() => `Layout${selectedLayout.value}`)

    onMounted(() => {
      activePage.value = 'Line'
    })
    const formData = reactive<IState>({
      name: '',
      desc: '',
      msg: '點開選單',
      status: 1,
      menuSize: '2500x1686',
      tags: [],
      boxsAction: { 1: { type: '', value: '', tags: [] } },
    })

    const actionTypes: OptionsType<string> = [
      { label: '無設定', value: '' },
      { label: '開啟連結', value: 'Link' },
      { label: '發送常用訊息', value: 'Message' },
      { label: '切換主選單', value: 'Inbox' },
      { label: '回覆文字', value: 'Text' },
      { label: '關鍵字', value: 'Keyword' },
      { label: '分享好友', value: 'Share' },
      { label: '開啟票券券夾', value: 'OpenTicket' },
      { label: '發送票券活動', value: 'TicketActivity' },
      { label: '發送票券券庫', value: 'TicketBox' },
    ]

    const initActionForm = () => {
      formData.boxsAction[activeBox.value] = {
        ...formData.boxsAction[activeBox.value],
        value: '',
        tags: [],
      }
    }

    const handleFileChanged = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files[0]
      const imgInfo = await getImageInfo(file)
      const result =
        imgInfo.width === sizeInfo.value.w &&
        imgInfo.height === sizeInfo.value.h
      if (!result) {
        alert(
          `圖片尺寸錯誤，尺寸應為${sizeInfo.value.w}x${sizeInfo.value.h}`,
          'error',
        )
        return
      }
      layoutImgUrl.value = imgInfo.src
    }

    watch(
      () => activeBox.value,
      () => {
        formData.boxsAction[activeBox.value] = formData.boxsAction[
          activeBox.value
        ] || {
          type: '',
          value: '',
          tags: [],
        }
      },
    )

    watch(
      () => formData.menuSize,
      () => {
        selectedLayout.value = formData.menuSize === '2500x1686' ? 1 : 13
        layoutImgUrl.value = ''
      },
    )

    return {
      actionTypes,
      formData,
      activeBox,
      selectedLayout,
      layoutSelectorVisible,
      boxLayout,
      initActionForm,
      sizeInfo,
      handleFileChanged,
      layoutImgUrl,
    }
  },
})
</script>

<template>
  <Layout>
    <PageHeader />
    <div class="p-3 mt-10 h-[calc(100%-40px)]">
      <div class="bg-white rounded-md h-full p-4 overflow-y-auto">
        <div class="flex justify-between mb-7">
          <h3 class="text-gray-700 text-xl">
            <i class="fab fa-slack-hash mr-2"></i>
            新增主選單
          </h3>
        </div>
        <div class="px-3 flex flex-col lg:flex-row">
          <div class="flex-1">
            <el-form
              :model="formData"
              ref="form"
              label-position="top"
              label-width="80px"
            >
              <el-form-item label="主選單名稱" required>
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="主選單說明">
                <el-input v-model="formData.desc"></el-input>
              </el-form-item>
              <el-form-item label="訊息欄文字">
                <el-input v-model="formData.msg"></el-input>
              </el-form-item>
              <el-form-item label="主選單顯示">
                <el-radio-group v-model="formData.status">
                  <el-radio :label="1">預設展開選單</el-radio>
                  <el-radio :label="2">預設隱藏選單</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主選單尺寸">
                <el-radio-group v-model="formData.menuSize">
                  <el-radio label="2500x1686">2500x1686 大型</el-radio>
                  <el-radio label="2500x843">2500x843 小型</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="flex gap-8">
                <div class="text-gray-500 text-sm">
                  <div
                    :class="[
                      'w-[320px] relative',
                      formData.menuSize === '2500x1686'
                        ? 'h-[200px]'
                        : 'h-[100px]',
                    ]"
                  >
                    <div class="absolute w-full h-full">
                      <component
                        :is="boxLayout"
                        v-model:activeBox="activeBox"
                      />
                    </div>
                    <img
                      :hidden="!layoutImgUrl"
                      :src="layoutImgUrl"
                      alt=""
                      class="h-full w-full"
                    />
                  </div>
                  <div class="leading-5 mt-3">
                    檔案格式：JPG、JPEG、PNG <br />
                    檔案容量：1MB以下 <br />
                    圖片尺寸：{{ sizeInfo.w }}px {{ sizeInfo.h }}px
                  </div>
                  <div class="space-y-2 mt-3">
                    <input hidden type="file" @change="handleFileChanged" />
                    <el-button
                      class="w-full m-0"
                      @click="
                        (e) => e.currentTarget.previousElementSibling.click()
                      "
                      >上傳圖片</el-button
                    >
                    <el-button
                      class="w-full m-0"
                      @click="layoutSelectorVisible = true"
                      >選擇版型</el-button
                    >
                  </div>
                </div>
                <div>
                  <el-form-item :label="`按鈕${activeBox}動作設定`">
                    <el-select
                      v-model="formData.boxsAction[activeBox].type"
                      @change="initActionForm"
                    >
                      <el-option
                        v-for="t in actionTypes"
                        :key="t.value"
                        :label="t.label"
                        :value="t.value"
                      >
                      </el-option>
                    </el-select>
                    <component
                      v-if="formData.boxsAction[activeBox].type"
                      :is="formData.boxsAction[activeBox].type"
                      v-model:form-data="formData.boxsAction[activeBox]"
                    />
                  </el-form-item>
                  <el-button class="mt-5" type="primary">套用設定</el-button>
                </div>
              </div>
            </el-form>
          </div>
          <div class="p-10">
            <div
              class="
                bg-mobile
                h-[574px]
                w-[278px]
                px-[7px]
                pt-[47px]
                pb-[67px]
                mx-auto
              "
            >
              <div
                class="
                  overflow-y-auto overflow-x-hidden
                  h-full
                  flex flex-col
                  justify-end
                "
              >
                <div
                  class="
                    h-40
                    bg-gray-100
                    flex
                    justify-center
                    items-center
                    relative
                  "
                  :class="
                    formData.menuSize === '2500x1686' ? 'h-[160px]' : 'h-[80px]'
                  "
                >
                  <i
                    class="far fa-image text-gray-300"
                    :class="
                      formData.menuSize === '2500x1686' ? 'fa-9x' : 'fa-5x'
                    "
                  ></i>
                  <img
                    :hidden="!layoutImgUrl"
                    :src="layoutImgUrl"
                    alt=""
                    class="h-full w-full absolute left-0"
                  />
                </div>
                <div
                  class="
                    bg-gray-200
                    text-gray-500 text-center
                    py-1.5
                    cursor-default
                    text-sm
                  "
                >
                  {{ formData.msg }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LayoutSelectorPopup
      v-model:visible="layoutSelectorVisible"
      :size="formData.menuSize"
      v-model:selected="selectedLayout"
    />
  </Layout>
</template>
