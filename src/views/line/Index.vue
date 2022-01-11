<script lang="ts">
import TabGroup from '@/components/TabGroup.vue'
import { productTypeMap } from '@/lib/maps'
import { useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import { OptionType } from '@/types'
import { computed, defineComponent, onMounted, watchEffect } from 'vue'

export default defineComponent({
  components: {
    TabGroup,
  },
  setup() {
    const { activePage } = useLayoutState()
    const { breadcrumb, loginInfo, botGuidWithType, botType, botGuid } =
      useGlobalState()
    const botOpts = computed(() =>
      loginInfo.value?.bots
        .filter((t) => t.product_type_id === botType.value)
        .map((t) => ({
          guid: t.GUID,
          label: `${t.name}(${t.GUID})`,
          value: `${t.product_type_id}_${t.GUID}`,
          img: t.picture,
        })),
    )
    const tabOptions: OptionType<string>[] = [
      { label: '儀表板', value: 'LineChart' },
      { label: '機器人設定', value: 'LineRobot' },
    ]

    onMounted(() => {
      activePage.value = 'basic'
    })

    watchEffect(() => {
      breadcrumb.value = botType.value
        ? [
            { name: '機器人管理' },
            {
              name: `${productTypeMap[botType.value]}-${botGuid.value}`,
              mobileShow: true,
            },
            { name: '儀表板', mobileShow: true },
          ]
        : []
    })

    return { tabOptions, botOpts, botGuidWithType }
  },
})
</script>

<template>
  <div class="p-3">
    <div class="flex flex-col sm:flex-row items-center mb-3 gap-1">
      <div class="flex space-x-3 w-full sm:w-auto mt-3 sm:mt-0">
        <el-select class="flex-1 sm:w-72" v-model="botGuidWithType">
          <el-option
            v-for="opt in botOpts"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          >
            <img
              :src="opt.img"
              class="rounded-full w-7 h-7 inline-block mr-2"
              alt=""
            />
            {{ opt.label }}
          </el-option>
        </el-select>
        <div class="ctrl-btn">
          <i class="fas fa-plus"></i>
        </div>
      </div>
      <div class="flex-1"></div>
      <TabGroup
        :value="$route.name.toString()"
        @change="
          (val) =>
            $router.push({
              name: val.toString(),
            })
        "
        :options="tabOptions"
      />
    </div>
    <router-view />
  </div>
</template>
