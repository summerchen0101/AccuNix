import { useLayoutState } from '@/providers/layoutProvider'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default () => {
  const route = useRoute()
  const { activePage } = useLayoutState()

  onMounted(() => {
    activePage.value = route.name.toString()
  })
}
