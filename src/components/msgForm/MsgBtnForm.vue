<script lang="tsx">
import { MsgType } from "@/lib/enum";
import { defineComponent, toRefs } from "vue";

export interface MsgButton {
  type: MsgType.Button;
  title: string;
  content: string;
  // btnLabel: string;
  // btnAction: number;
}

export default defineComponent({
  name: "MsgBtnForm",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { title, content } = toRefs(props);
    return () => (
      <>
        <el-form-item label="標題">
          <el-input v-model={title.value}></el-input>
        </el-form-item>
        <el-form-item label="內文">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model={content.value}
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </>
    );
  },
});
</script>
