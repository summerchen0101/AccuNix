import { onMounted, onUnmounted, ref } from 'vue'

export default function (query: string) {
  const isMatch = ref(false)
  const onResize = () => {
    isMatch.value = window.matchMedia(query).matches
  }
  onMounted(() => {
    window.addEventListener('resize', onResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
  return { isMatch }
}
