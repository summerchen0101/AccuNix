<template>
  <div class="fixed h-full pt-24 z-10 group">
    <div
      class="
        bg-primary-500
        transition-all
        relative
        z-20
        group-hover:w-52
        sidebar
        h-full
        overflow-x-hidden
      "
      :class="isMiniSidebar ? 'w-0 md:w-12 mini' : 'w-52 md:w-52'"
    >
      <div class="w-52 flex flex-col h-full">
        <div class="p-2">
          <el-select
            :class="isMiniSidebar && 'invisible opacity-0 -translate-x-full'"
            class="
              w-full
              transition-all
              group-hover:visible
              group-hover:opacity-100
              group-hover:translate-x-0
            "
            size="small"
            v-model="botGuidWithType"
          >
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
        </div>
        <ul class="flex-1">
          <MenuItem v-for="m in botMenus" :key="m.label" :menu="m" />
        </ul>
        <ul class="bg-primary-600">
          <MenuItem v-for="m in perOrgMenus" :key="m.label" :menu="m" />
        </ul>
      </div>
    </div>
    <!-- sidebar cover背景 -->
    <div
      class="
        fixed
        h-full
        w-full
        top-0
        left-0
        bg-black/20
        transition-all
        md:hidden
        z-0
      "
      :class="isMiniSidebar ? 'opacity-0 invisible' : 'opacity-100 visible'"
      @click="isMiniSidebar = !isMiniSidebar"
    ></div>
  </div>
</template>

<script lang="ts">
import MenuItem from '@/components/Layout/MenuItem.vue'
import { botMenus, menuList } from '@/lib/menu'
import { useGlobalState } from '@/providers/globalProvider'
import { useLayoutState } from '@/providers/layoutProvider'
import { computed, defineComponent, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  setup(props) {
    const router = useRouter()
    const { isMiniSidebar } = useLayoutState()
    const { loginInfo, botGuidWithType, botType, botInfo } = useGlobalState()
    const botOpts = computed(() =>
      loginInfo.value?.bots.map((t) => ({
        guid: t.GUID,
        label: `${t.name}`,
        value: `${t.product_type_id}_${t.GUID}`,
        img: t.picture,
      })),
    )

    const perBotMenus = computed(() =>
      botMenus[botType.value]?.filter(
        (m) => botInfo.value?.permissions[m.code]?.read,
      ),
    )
    const perOrgMenus = computed(() =>
      menuList
        .map((m) => {
          return {
            ...m,
            subs: m.subs?.filter(
              (n) => loginInfo.value?.organization.permissions[n.code]?.read,
            ),
          }
        })
        .filter((m) =>
          m.subs
            ? m.subs?.length > 0
            : loginInfo.value?.organization.permissions[m.code]?.read,
        ),
    )
    // watch(
    //   () => perBotMenus.value,
    //   () => {
    //     if (perBotMenus.value.length) {
    //       router.push(perBotMenus.value[0].path)
    //     }
    //   },
    // )
    return {
      isMiniSidebar,
      perOrgMenus,
      botMenus: perBotMenus,
      botOpts,
      botGuidWithType,
      botInfo,
    }
  },
})
</script>

<style scoped lang="scss"></style>
