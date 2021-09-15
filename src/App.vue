<script lang="tsx">
import { defineComponent } from 'vue'
import { useLayoutProvider } from './providers/layoutProvider'
import { useLineBotProvider } from './providers/lineBotProvider'

export default defineComponent({
  setup() {
    useLayoutProvider()
    useLineBotProvider()
    return () => <router-view />
  },
})
</script>

<style lang="scss"></style>
