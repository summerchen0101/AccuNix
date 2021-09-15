<script lang="tsx">
import { defineComponent, PropType, toRefs } from 'vue'
export default defineComponent({
  name: 'CardPanel',
  props: {
    title: String,
    icon: String,
    desc: String,
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props, { slots }) {
    const { title, icon, desc, onClick } = toRefs(props)
    return () => (
      <div class="bg-white rounded-md p-4 shadow-md">
        <div class="flex items-center">
          <div class="flex-1 space-x-2 flex items-center">
            <i class={['text-gray-400 text-xl', icon.value].join(' ')}></i>
            <span class="text-lg text-gray-600 font-bold">{title.value}</span>
          </div>
          <span
            class="bg-gray-200 text-gray-500 py-1 px-3 text-sm rounded-full cursor-pointer"
            onClick={onClick.value}
          >
            設定
          </span>
        </div>
        <div class="text-gray-500 text-sm mt-3 pb-3">{desc.value}</div>
        {slots.default?.()}
      </div>
    )
  },
})
</script>
