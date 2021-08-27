<script lang="tsx">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "MsgTextForm",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // const { content } = toRefs(props);
    // const { content } = reactive({ content: "" });
    return () => (
      <>
        <el-form-item label="文字內容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model={props.content}
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </>
    );
  },
});
</script>
