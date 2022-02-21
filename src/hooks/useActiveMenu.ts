import { useLayoutState } from '@/providers/layoutProvider'
import { useStore } from '@/service/store'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default () => {
  const route = useRoute()
  const store = useStore()
  const { activePage } = useLayoutState()

  onMounted(() => {
    activePage.value = route.name.toString()
  })
}
