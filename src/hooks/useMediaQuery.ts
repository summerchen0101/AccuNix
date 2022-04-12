import { onMounted, onUnmounted, ref } from 'vue'

export default function (query: string) {
  const isMatch = ref(false)
  const onCheckMediaSize = () => {
    isMatch.value = window.matchMedia(query).matches
  }
  onMounted(() => {
    onCheckMediaSize()
    window.addEventListener('resize', onCheckMediaSize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', onCheckMediaSize)
  })
  return { isMatch }
}
