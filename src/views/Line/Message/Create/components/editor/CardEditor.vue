<template>
  <h3 class="mb-4">圖卡</h3>
  <el-form :form="form" label-position="top">
    <el-form-item>
      <div class="flex items-center gap-2 relative mb-4">
        <div class="bg-gray-100 w-10 h-10 rounded-full"></div>
        <div class="text-sm text-gray-700">{{ nickname }}</div>
        <i class="fas fa-pen text-sm cursor-pointer" @click="isShowNicknameEditor = true"></i>
        <NicknameSetter v-model:visible="isShowNicknameEditor" v-model:name="nickname" />
      </div>
    </el-form-item>
    <el-form-item label="預覽訊息">
      <MessageParams :params="{ name: '用戶名稱' }">
        <el-input v-model="form.reviewMsg" placeholder="請輸入預覽文字" />
      </MessageParams>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div class="flex items-end">按鈕數量 <span class="text-gray-400 ml-1">(按鈕數量需一致)</span></div>
      </template>
      <el-radio-group v-model="form.btnCount">
        <el-radio v-for="n in 3" :key="n" :label="n">{{ n }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div class="flex items-end">
          圖片尺寸
          <span class="text-gray-400 ml-1">(圖片方向需一致 格式jpg, png, 最寬1049px, 大小10MB內)</span>
        </div>
      </template>
      <el-radio-group v-model="form.imageAspectRatio">
        <el-radio :label="ImageRatio.RECTANGLE">長方形(建議比例1.51:1)</el-radio>
        <el-radio :label="ImageRatio.SQUARE">正方形(建議比例1:1)</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="圖片版面">
      <el-radio-group v-model="form.imageSize">
        <el-radio :label="ImageSize.COVER">最大化</el-radio>
        <el-radio :label="ImageSize.CONTAIN">原比例縮放</el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="mt-6 space-y-4">
      <div
        v-for="(card, c_i) in form.cards"
        :key="c_i"
        class="bg-white rounded-md shadow-md border border-gray-100 p-4 space-y-3 w-72"
      >
        <el-form-item>
          <MessageParams :params="{ name: '用戶名稱' }">
            <el-input v-model="card.title" placeholder="請輸入標題" />
          </MessageParams>
        </el-form-item>
        <el-form-item>
          <MessageParams :params="{ name: '用戶名稱' }">
            <el-input type="textarea" v-model="card.content" placeholder="請輸入內容" :rows="4" />
          </MessageParams>
        </el-form-item>
        <el-form-item>
          <div class="space-y-3">
            <div class="" v-for="(btn, b_i) in card.btns" :key="b_i">
              <el-button
                :type="cardActiveBtnIndex === `${c_i}|${b_i}` ? 'primary' : undefined"
                class="w-full"
                @click="
                  () => {
                    cardActiveBtnIndex = cardActiveBtnIndex === `${c_i}|${b_i}` ? '' : `${c_i}|${b_i}`
                  }
                "
              >
                {{ btn.label }}
              </el-button>
              <BtnActionSetter
                v-if="cardActiveBtnIndex === `${c_i}|${b_i}`"
                v-model:btn="card.btns[b_i]"
                @remove="card.btns.splice(b_i, 1)"
                @close="cardActiveBtnIndex = ''"
              />
            </div>
          </div>
        </el-form-item>
      </div>
      <div>
        <div class="fas fa-plus-circle fa-2x cursor-pointer text-gray-300 hover:text-gray-400" @click="addCard()"></div>
      </div>
    </div>
  </el-form>
  <TagCreatePopup />
</template>
<script lang="ts">
import { MessageBtnAction, MessageType, ImageRatio, ImageSize } from '@/lib/enum'
import { BtnItem, CardMsg } from '@/service/store/msgStore'
import { take } from 'lodash'
import { computed, defineComponent, onMounted, PropType, ref, watch, watchEffect } from 'vue'
import BtnActionSetter from '../BtnActionSetter.vue'
import MessageParams from '../MessageParams.vue'
import NicknameSetter from '../NicknameSetter.vue'
import TagCreatePopup from '../TagCreatePopup.vue'

export default defineComponent({
  props: {
    targetMsg: Object as PropType<CardMsg>,
  },
  emits: ['update:targetMsg'],
  setup(props, { emit }) {
    const isShowNicknameEditor = ref(false)
    const nickname = ref('Summer')
    const form = computed<CardMsg>({
      get: () => props.targetMsg,
      set: (data) => {
        emit('update:targetMsg', data)
      },
    })
    const createDefaultBtns = () => {
      const cards = form.value.cards.map((c) => {
        const diff = form.value.btnCount - c.btns.length
        return {
          ...c,
          btns:
            diff > 0
              ? c.btns.concat(
                  [...Array(diff)].map((b) => ({ label: '按鈕1', action: MessageBtnAction.Text, text: '' })),
                )
              : take(c.btns, form.value.btnCount),
        }
      })
      form.value = { ...form.value, cards }
    }
    onMounted(createDefaultBtns)
    watch(() => form.value.btnCount, createDefaultBtns)
    const cardActiveBtnIndex = ref<string>('')

    const addCard = () => {
      form.value = {
        ...form.value,
        cards: form.value.cards.concat({
          title: '',
          content: '',
          img: '',
          btns: [...Array(form.value.btnCount)].map((b) => ({
            label: '按鈕1',
            action: MessageBtnAction.Text,
            text: '',
          })),
        }),
      }
      // cardActiveBtnIndex[form.value.cards.length - 1] = 0
      // createDefaultBtns()
    }

    return { isShowNicknameEditor, nickname, cardActiveBtnIndex, form, MessageType, ImageRatio, ImageSize, addCard }
  },
  components: { NicknameSetter, MessageParams, BtnActionSetter, TagCreatePopup },
})
</script>
<style></style>
