<script lang="tsx">
import Layout from '@/components/Layout/Layout.vue'
import PageHeader from '@/components/Layout/PageHeader.vue'
import LineCharts from '@/components/linebot/LineCharts.vue'
import LineSettings from '@/components/linebot/LineSettings.vue'
import LineRobotCtrlVue from '@/components/LinebotCtrl.vue'
import TabGroup from '@/components/TabGroup.vue'
import { useLayoutState } from '@/providers/layoutProvider'
import { OptionType } from '@/types'
import {
  computed,
  defineComponent,
  KeepAlive,
  onMounted,
  reactive,
  ref,
} from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    PageHeader,
  },
  setup() {
    const currentTab = ref<keyof typeof componentMap>('LineSettings')

    const componentMap = {
      LineCharts,
      LineSettings,
    }

    const TabContent = computed(() => componentMap[currentTab.value])

    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10">
          <LineRobotCtrlVue />
          <KeepAlive>
            <TabContent.value />
          </KeepAlive>
        </div>
      </Layout>
    )
  },
})
</script>
