<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div class="flex items-center justify-center text-gray-500 h-full min-h-[100px]">
        <i class="fas fa-spinner fa-spin fa-3x opacity-80"></i>
      </div>
    );
  },
});
</script>
