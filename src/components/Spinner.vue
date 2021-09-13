<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div class="flex items-center justify-center text-gray-500 p-5">
        <i class="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    );
  },
});
</script>
