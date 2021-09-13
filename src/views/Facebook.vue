<script lang="tsx">
import Layout from "@/components/Layout/Layout.vue";
import PageHeader from "@/components/Layout/PageHeader.vue";
import { useLayoutState } from "@/providers/layoutProvider";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Facebook",
  components: {
    PageHeader,
  },
  setup() {
    const { activePage } = useLayoutState();
    onMounted(() => {
      activePage.value = "Facebook";
    });
    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10">hello</div>
      </Layout>
    );
  },
});
</script>
