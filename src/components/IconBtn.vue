<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    iconClass: String,
  },
  setup(props) {
    return (
      <div class="text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:scale-110">
        <i class={props.iconClass}></i>
      </div>
    )
  },
})
</script>
