<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const info = reactive({ title: "Facebook Page" });

    const { t, locale } = useI18n();
    // Something to do ...
    return () => (
      <div>
        <h2>{info.title}</h2>
        <p>{t("message.hello", { name: "summer" })}</p>
      </div>
    );
  },
});
</script>

<style scoped></style>
