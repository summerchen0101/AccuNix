<script lang="ts">
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  computed,
  watch,
  shallowRef,
  DefineComponent,
  defineAsyncComponent,
} from 'vue'
import LayoutSelector from '@/components/inbox/popups/LayoutSelector.vue'
import boxLayouts from '@/components/inbox/gridbox'
// import { MsgBtnFields } from '@/components/types'

interface IState {
  keyword: string
  desc: string
  status: boolean
  tags: number[]
}

export default defineComponent({
  components: {
    Layout,
    PageHeader,
    LayoutSelector,
    ...boxLayouts,
  },
  setup() {
    const { activePage } = useLayoutState()
    const layoutSelectorVisible = ref(false)
    const activeBox = ref<number>(1)
    const selectedLayout = ref<number>(1)
    watch(
      () => selectedLayout.value,
      () => {
        activeBox.value = 1
      },
    )
    const boxLayout = computed(() => `Layout${selectedLayout.value}`)

    onMounted(() => {
      activePage.value = 'Line'
    })
    const formData = reactive<IState>({
      keyword: '',
      desc: '',
      status: true,
      tags: [],
    })

    return {
      formData,
      activeBox,
      selectedLayout,
      layoutSelectorVisible,
      boxLayout,
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
                <el-input v-model="formData.keyword"></el-input>
              </el-form-item>
              <el-form-item label="主選單說明">
                <el-input v-model="formData.desc"></el-input>
              </el-form-item>
              <el-form-item label="訊息欄文字">
                <el-input v-model="formData.desc"></el-input>
              </el-form-item>
              <el-form-item label="主選單顯示 展開/隱藏">
                <el-radio-group>
                  <el-radio label="預設展開選單"></el-radio>
                  <el-radio label="預設隱藏選單"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主選單尺寸">
                <el-radio-group>
                  <el-radio label="2500x1686 大型"></el-radio>
                  <el-radio label="2500x843 小型"></el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="flex gap-8">
                <div class="text-gray-500 text-sm">
                  <div class="w-[320px] h-[200px]">
                    <component :is="boxLayout" v-model:activeBox="activeBox" />
                  </div>
                  <div class="leading-5 mt-3">
                    檔案格式：JPG、JPEG、PNG <br />
                    檔案容量：1MB以下 <br />
                    圖片尺寸：2500px 1686px
                  </div>
                  <div class="space-y-2 mt-3">
                    <el-button class="w-full m-0">上傳圖片</el-button>
                    <el-button
                      class="w-full m-0"
                      @click="layoutSelectorVisible = true"
                      >選擇版型</el-button
                    >
                  </div>
                </div>
                <div class="">
                  <el-form-item :label="`按鈕${activeBox}動作設定`">
                    <el-select v-model="formData.keyword">
                      <el-option label="無設定" value=""></el-option>
                      <el-option label="開啟連結" value="1"></el-option>
                    </el-select>
                  </el-form-item>
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
              <div class="overflow-y-auto overflow-x-hidden h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LayoutSelector
      v-model:visible="layoutSelectorVisible"
      v-model:selected="selectedLayout"
    />
  </Layout>
</template>
