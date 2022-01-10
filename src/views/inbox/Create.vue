<script lang="ts">
import actionForms from '@/components/inbox/form'
import InboxLayout, { toLayoutBoxs } from '@/components/inbox/InboxLayout.vue'
import LayoutSelectorPopup from '@/components/inbox/popups/LayoutSelectorPopup.vue'
import LoadingCover from '@/components/LoadingCover.vue'
import PageIconBtn from '@/components/PageIconBtn.vue'
import useAlert from '@/hooks/useAlert'
import { BreadcrumbItem, useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import useImgUpload from '@/service/useImgUpload'
import useInboxCreate, { InboxCreateReq } from '@/service/useInboxCreate'
import { OptionsType } from '@/types'
import { getImageInfo } from '@/utils'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
// import { MsgBtnFields } from '@/components/types'

export interface ActionForm {
  tags?: string[]
  type: string
  richmenuGuid?: number | string
  messageGuid?: string
  uri?: string
  original?: boolean
  couponGuid?: string
  keyword?: string
  message?: string
  linebotGuid?: string
  campaignGuid?: string
}
interface IState {
  name: string
  desc: string
  msg: string
  defaultOpen: number
  size: string
  areas: Record<number, ActionForm>
}

export default defineComponent({
  components: {
    LayoutSelectorPopup,
    ...actionForms,
    InboxLayout,
    LoadingCover,
    PageIconBtn,
  },
  setup() {
    const { activePage } = useLayoutState()
    const layoutImgSrc = ref('')
    const imgFile = ref<File>()
    const alert = useAlert()
    const { botGuid, orgGuid } = useGlobalState()
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
    const { doCreate, isLoading } = useInboxCreate()

    onMounted(() => {
      activePage.value = 'Line'
    })

    const data = reactive<IState>({
      name: '',
      desc: '',
      msg: '點開選單',
      defaultOpen: 1,
      size: '2500x1686',
      areas: {
        1: {
          tags: [],
          type: '',
          richmenuGuid: '',
          messageGuid: '',
          uri: '',
          original: false,
          couponGuid: '',
          keyword: '',
        },
      },
    })

    const sizeInfo = computed(() => {
      const _size = data.size.split('x')
      return { w: +_size[0], h: +_size[1] }
    })

    const actionTypes: OptionsType<string> = [
      { label: '無設定', value: '' },
      { label: '開啟連結', value: 'Link' },
      { label: '發送常用訊息', value: 'Message' },
      { label: '切換主選單', value: 'Inbox' },
      // { label: '取消主選單', value: 'InboxCancel' },
      { label: '回覆文字', value: 'Text' },
      { label: '關鍵字', value: 'Keyword' },
      { label: '分享好友', value: 'Share' },
      { label: '開啟票券券夾', value: 'OpenTicket' },
      { label: '發送票券活動', value: 'TicketActivity' },
      { label: '發送票券券庫', value: 'TicketBox' },
    ]

    const initActionForm = (type) => {
      data.areas[activeBox.value] = {
        tags: [],
        type,
        richmenuGuid: '',
        messageGuid: '',
        uri: '',
        original: false,
        couponGuid: '',
        keyword: '',
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
      imgFile.value = file
      layoutImgSrc.value = imgInfo.src
    }

    const handleFileUpload = (file: File) => {
      const formData = new FormData()
      formData.append('type', 'file')
      formData.append('from', 'richmenu')
      formData.append(
        'path',
        `org/${orgGuid.value}/line/${botGuid.value}/richmenu`,
      )
      formData.append('file', file)
      return doUpload(formData)
    }

    const onSubmit = async () => {
      if (!imgFile.value) {
        return alert('請上傳圖片', 'error')
      }
      let imgRes = await handleFileUpload(imgFile.value)

      const areas = toLayoutBoxs({
        w: sizeInfo.value.w,
        h: sizeInfo.value.h,
        layout: selectedLayout.value,
      })
      const d = data
      const bodyData: InboxCreateReq = {
        name: d.name,
        description: d.desc,
        image_url: imgRes?.path,
        image_file_id: imgRes?.id,
        data: {
          name: d.name,
          selected: d.defaultOpen === 1,
          chatBarText: d.msg,
          size: {
            width: sizeInfo.value.w,
            height: sizeInfo.value.h,
          },
          areas: areas.map((bounds, i) => {
            let action = d.areas[i + 1] || {
              tags: [],
              type: '',
              richmenuGuid: '',
              messageGuid: '',
              uri: '',
              original: false,
              couponGuid: '',
              keyword: '',
            }

            switch (action.type) {
              case 'Link':
                action = {
                  uri: action.uri,
                  tags: action.tags,
                  type: 'uri',
                  original: false,
                }
                break
              case 'Message':
                action = {
                  tags: action.tags,
                  type: 'send_messages',
                  messageGuid: action.messageGuid,
                }
                break
              case 'Inbox':
                action = {
                  tags: action.tags,
                  type: 'richmenu_switch',
                  richmenuGuid: action.richmenuGuid,
                }
                break
              case 'Text':
                action = {
                  type: 'message',
                  message: action.keyword,
                }
                break
              case 'Keyword':
                action = {
                  type: 'keyword',
                  keyword: action.keyword,
                }
                break
              case 'Share':
                action = {
                  type: 'share',
                  linebotGuid: action.linebotGuid,
                }
                break
              case 'OpenTicket':
                action = {
                  type: 'coupon_wallet',
                }
                break
              case 'TicketActivity':
                action = {
                  type: 'coupon_campaign',
                  campaignGuid: action.campaignGuid,
                }
                break
              case 'TicketBox':
                action = {
                  type: 'coupon_campaign',
                  couponGuid: action.couponGuid,
                }
                break

              default:
                break
            }
            return {
              bounds,
              action,
            }
          }),
        },
      }
      const res = await doCreate(bodyData)
    }

    watch(
      () => activeBox.value,
      () => {
        data.areas[activeBox.value] = data.areas[activeBox.value] || {
          tags: [],
          type: '',
          richmenuGuid: '',
          messageGuid: '',
          uri: '',
          original: false,
          couponGuid: '',
          keyword: '',
        }
      },
    )

    watch(
      () => data.size,
      () => {
        selectedLayout.value = data.size === '2500x1686' ? 1 : 13
        layoutImgSrc.value = ''
      },
    )

    const breadcrumb: BreadcrumbItem[] = [
      { name: '聊天機器人' },
      { name: 'LINE' },
      { name: '主選單列表', path: '/inbox/list' },
      { name: '新增主選單' },
    ]

    return {
      breadcrumb,
      actionTypes,
      data,
      onSubmit,
      activeBox,
      selectedLayout,
      layoutSelectorVisible,
      initActionForm,
      sizeInfo,
      handleFileChanged,
      layoutImgSrc,
      isLoading,
      isUploadLoading,
    }
  },
})
</script>

<template>
  <div class="p-3 h-full">
    <div class="bg-white rounded-md h-full p-4 overflow-y-auto">
      <div class="flex justify-between mb-7">
        <h3 class="text-gray-700 text-xl">
          <i class="fab fa-slack-hash mr-2"></i>
          新增主選單
        </h3>
      </div>
      <LoadingCover :is-loading="isLoading || isUploadLoading">
        <div class="px-3 flex flex-col lg:flex-row">
          <div class="flex-1">
            <el-form
              :model="data"
              ref="form"
              label-position="top"
              label-width="80px"
            >
              <el-form-item label="主選單名稱" required>
                <el-input v-model="data.name"></el-input>
              </el-form-item>
              <el-form-item label="主選單說明">
                <el-input v-model="data.desc"></el-input>
              </el-form-item>
              <el-form-item label="訊息欄文字">
                <el-input v-model="data.msg"></el-input>
              </el-form-item>
              <el-form-item label="主選單顯示">
                <el-radio-group v-model="data.defaultOpen">
                  <el-radio :label="1">預設展開選單</el-radio>
                  <el-radio :label="2">預設隱藏選單</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主選單尺寸">
                <el-radio-group v-model="data.size">
                  <el-radio label="2500x1686">2500x1686 大型</el-radio>
                  <el-radio label="2500x843">2500x843 小型</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="flex gap-8">
                <div class="text-gray-500 text-sm">
                  <div
                    class="relative"
                    :style="{
                      height: sizeInfo.h / 7 + 'px',
                      width: sizeInfo.w / 7 + 'px',
                    }"
                  >
                    <div class="absolute w-full h-full">
                      <InboxLayout
                        :height="sizeInfo.h / 7"
                        :width="sizeInfo.w / 7"
                        :layout="selectedLayout"
                        v-model:activeBox="activeBox"
                      />
                    </div>
                    <img
                      :hidden="!layoutImgSrc"
                      :src="layoutImgSrc"
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
                <div class="flex-1 max-w-[300px]">
                  <el-form-item :label="`按鈕${activeBox}動作設定`">
                    <el-select
                      v-model="data.areas[activeBox].type"
                      @change="initActionForm"
                      class="w-full"
                    >
                      <el-option
                        v-for="t in actionTypes"
                        :key="t.value"
                        :label="t.label"
                        :value="t.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <component
                    v-if="data.areas[activeBox].type"
                    :is="data.areas[activeBox].type"
                    v-model:form-data="data.areas[activeBox]"
                  />
                  <el-button class="mt-5" type="primary" @click="onSubmit"
                    >套用設定</el-button
                  >
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
                  class="bg-gray-100 flex justify-center items-center relative"
                  :class="data.size === '2500x1686' ? 'h-[178px]' : 'h-[89px]'"
                >
                  <i
                    class="far fa-image text-gray-300"
                    :class="data.size === '2500x1686' ? 'fa-9x' : 'fa-5x'"
                  ></i>
                  <img
                    :hidden="!layoutImgSrc"
                    :src="layoutImgSrc"
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
                  {{ data.msg }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingCover>
    </div>
  </div>
  <LayoutSelectorPopup
    v-model:visible="layoutSelectorVisible"
    :size="data.size"
    v-model:selected="selectedLayout"
  />
</template>
