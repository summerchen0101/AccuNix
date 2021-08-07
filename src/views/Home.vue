<script lang="tsx">
import PageHeader from "@/components/Layout/PageHeader.vue";
import { defineComponent, watchEffect } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    PageHeader,
  },
  setup() {
    const router = useRouter();
    watchEffect(() => {
      router.push("/line/settings");
    });
  },
});
</script>
