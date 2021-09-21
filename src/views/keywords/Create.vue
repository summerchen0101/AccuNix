<script lang="ts">
import FormFieldTips from '@/components/FormFieldTips.vue'
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import MsgTextReview from '@/components/msgReview/MsgTextReview.vue'
import { MsgType } from '@/lib/enum'
import { cloneDeep } from 'lodash'
import { reactive, defineComponent, onMounted } from 'vue'
import MsgTextForm from '@/components/msgForm/MsgTextForm.vue'
import MsgBtnForm from '@/components/msgForm/MsgBtnForm.vue'
import MsgBtnReview from '@/components/msgReview/MsgBtnReview.vue'
import { MsgBtnFields, MsgTextFields } from '@/components/types'
import { useLayoutState } from '@/providers/layoutProvider'
import MsgImgForm from '@/components/msgForm/MsgImgForm.vue'
import MsgImgReview from '@/components/msgReview/MsgImgReview.vue'
import MsgVideoFormVue from '@/components/msgForm/MsgVideoForm.vue'
import MsgVideoReviewVue from '@/components/msgReview/MsgVideoReview.vue'
// import { MsgBtnFields } from '@/components/types'

type MsgGroupType =
  | {
      type: MsgType.Text
      form: MsgTextFields
    }
  | {
      type: MsgType.Button
      form: MsgBtnFields
    }

interface IState {
  keyword: string
  desc: string
  status: boolean
  tags: number[]
  msgGroups: MsgGroupType[]
  currentMsgIndex: string
}

export default defineComponent({
  components: {
    FormFieldTips,
    Layout,
    PageHeader,
    MsgTextReview,
    MsgTextForm,
    MsgBtnForm,
    MsgBtnReview,
  },
  setup() {
    const { activePage } = useLayoutState()
    onMounted(() => {
      activePage.value = 'Line'
    })
    const formData = reactive<IState>({
      keyword: '',
      desc: '',
      status: true,
      tags: [],
      msgGroups: [{ type: MsgType.Text, form: { content: '' } }],
      currentMsgIndex: '0',
    })

    const handleCreateMsg = () => {
      if (formData.msgGroups.length >= 5) return
      formData.msgGroups.push({
        type: MsgType.Text,
        form: { content: '' },
      })
      formData.currentMsgIndex = (formData.msgGroups.length - 1).toString()
    }
    const handleCopyMsg = () => {
      if (formData.msgGroups.length >= 5) return
      formData.msgGroups.push(
        cloneDeep(formData.msgGroups[+formData.currentMsgIndex]),
      )
      formData.currentMsgIndex = (formData.msgGroups.length - 1).toString()
    }
    const handleUserSet = () => {
      // formData.msgGroups.push({
      //   type: MsgType.Text,
      //   title: '',
      //   content: '',
      // })
      // formData.currentMsgIndex = (formData.msgGroups.length - 1).toString()
    }

    const onTabRemove = (targetIndex: number) => {
      formData.msgGroups.splice(targetIndex, 1)
      formData.currentMsgIndex = (
        targetIndex - 1 >= 0 ? targetIndex - 1 : 0
      ).toString()
    }

    const onTypeChange = (index: number, val: number) => {
      switch (val) {
        case MsgType.Text:
          formData.msgGroups[index].form = {
            content: '',
          } as MsgTextFields
          break
        case MsgType.Button:
          formData.msgGroups[index].form = {
            title: '',
            content: '',
            review: '',
            btns: [{ title: '按鈕', action: 1, reply: '' }],
          } as MsgBtnFields
          break

        default:
          break
      }
    }

    const formMap = {
      [MsgType.Text]: MsgTextForm,
      [MsgType.Button]: MsgBtnForm,
      [MsgType.Image]: MsgImgForm,
      [MsgType.Video]: MsgVideoFormVue,
    }
    const reviewMap = {
      [MsgType.Text]: MsgTextReview,
      [MsgType.Button]: MsgBtnReview,
      [MsgType.Image]: MsgImgReview,
      [MsgType.Video]: MsgVideoReviewVue,
    }

    return {
      formMap,
      reviewMap,
      onTabRemove,
      handleUserSet,
      handleCopyMsg,
      handleCreateMsg,
      onTypeChange,
      formData,
      MsgType,
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
            新增關鍵字庫
          </h3>
        </div>
        <div class="px-3">
          <el-form
            :model="formData"
            ref="form"
            label-position="top"
            label-width="80px"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <el-form-item label="關鍵字">
                <el-input v-model="formData.keyword"></el-input>
              </el-form-item>
              <el-form-item label="說明">
                <el-input v-model="formData.desc"></el-input>
              </el-form-item>

              <el-form-item label="標籤">
                <el-select
                  v-model="formData.tags"
                  placeholder="請選擇標籤"
                  multiple
                  :multiple-limit="3"
                  class="w-full"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <FormFieldTips
                  class="mt-2"
                  content="標籤設定最多 3 個，目前額度： 0/3"
                />
                <FormFieldTips content="標籤不能使用以下特殊符號：..." />
              </el-form-item>
              <el-form-item label="訊息設定">
                <el-select
                  v-model="formData.tags"
                  placeholder="請選擇動作"
                  class="w-full"
                ></el-select>
                <FormFieldTips
                  class="mt-2"
                  content="選擇常用訊息做編輯，或直接開始做訊息設定吧！"
                />
              </el-form-item>
              <el-form-item label="關鍵字動作">
                <el-select
                  v-model="formData.tags"
                  placeholder="請選擇動作"
                  class="w-full"
                >
                  <el-option label="發送訊息" value="1"></el-option>
                  <el-option label="觸發腳本" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="狀態">
                <el-switch v-model="formData.status"></el-switch>
              </el-form-item>
            </div>

            <div class="flex space-x-4 mt-5">
              <div class="flex-1">
                <div class="flex space-x-2 mb-4">
                  <el-button
                    icon="fas fa-plus"
                    circle
                    @click="handleCreateMsg"
                  ></el-button>

                  <el-button
                    icon="fas fa-copy"
                    circle
                    @click="handleCopyMsg"
                  ></el-button>

                  <el-button
                    icon="fas fa-user-cog"
                    circle
                    @click="handleUserSet"
                  ></el-button>
                </div>
                <el-tabs
                  type="card"
                  v-model="formData.currentMsgIndex"
                  :closable="formData.msgGroups.length > 1"
                  @tab-remove="onTabRemove"
                >
                  <el-tab-pane
                    v-for="(g, i) in formData.msgGroups"
                    :key="i"
                    :label="`第${i + 1}則`"
                    :name="i.toString()"
                  >
                    <el-form-item>
                      <el-select
                        v-model="g.type"
                        placeholder="請選擇類型"
                        @change="(val) => onTypeChange(i, val)"
                      >
                        <el-option :value="MsgType.Text" label="文字">
                          <span>文字</span> <i class="fas fa-font"></i>
                        </el-option>
                        <el-option :value="MsgType.Button" label="按鈕">
                          <span>按鈕</span> <i class="far fa-hand-pointer"></i>
                        </el-option>
                        <el-option :value="MsgType.Image" label="圖片">
                          <span>圖片</span> <i class="far fa-image"></i>
                        </el-option>
                        <el-option :value="MsgType.Video" label="影片">
                          <span>影片</span> <i class="fas fa-film"></i>
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <component :is="formMap[g.type]" v-model:form="g.form" />
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="w-1/2">
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
                  <div class="overflow-y-auto overflow-x-hidden h-full">
                    <div
                      v-for="(msg, i) in formData.msgGroups"
                      :key="i"
                      class="flex items-start space-x-4 p-2"
                    >
                      <i class="fas fa-user-circle text-4xl text-gray-400"></i>
                      <!-- {{ msg.form }} -->
                      <component
                        :is="reviewMap[msg.type]"
                        :key="new Date().getTime() + MsgType.Text"
                        :data="msg.form"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </Layout>
</template>
