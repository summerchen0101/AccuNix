<template>
  <span class="outline-btn" @click="handleCopy">
    <i class="fas fa-copy mr-1"></i>
    <span v-text="text"></span>
  </span>
</template>
<script lang="ts">
import useAlert from '@/hooks/useAlert'
import { defineComponent } from 'vue'
import useClipboard from 'vue-clipboard3'

export default defineComponent({
  props: {
    text: String,
  },
  setup(props) {
    const { toClipboard } = useClipboard()
    const alert = useAlert()
    const handleCopy = async () => {
      await toClipboard(props.text)
      alert('已複製至剪貼簿', 'success')
    }
    return { handleCopy }
  },
})
</script>
<style lang=""></style>
