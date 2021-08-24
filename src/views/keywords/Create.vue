<template>
  <div></div>
</template>

<script lang="tsx">
import FormFieldTips from "@/components/FormFieldTips.vue";
import IconBtn from "@/components/IconBtn.vue";
import Layout from "@/components/Layout/Layout.vue";
import PageHeader from "@/components/Layout/PageHeader.vue";
import { defineComponent, reactive } from "vue";
import { cloneDeep } from "lodash";

enum MsgType {
  Text = 1,
  Button = 2,
  Image = 3,
  Video = 4,
}
interface MsgText {
  type: MsgType.Text;
  content: string;
}
interface MsgButton {
  type: MsgType.Button;
  title: string;
  content: string;
  // btnLabel: string;
  // btnAction: number;
}
interface MsgImage {
  type: MsgType.Image;
  image: string;
}
interface MsgVideo {
  type: MsgType.Video;
  video: string;
  image: string;
}

type MsgGroupType = MsgText | MsgButton | MsgImage | MsgVideo;

interface IState {
  keyword: string;
  desc: string;
  status: 1 | 0;
  tags: number[];
  msgGroups: MsgGroupType[];
  currentMsgIndex: number;
}

export default defineComponent({
  name: "KeywordCreate",
  setup() {
    const form = reactive<IState>({
      keyword: "",
      desc: "",
      status: 1,
      tags: [],
      msgGroups: [{ type: MsgType.Text, content: "" }],
      currentMsgIndex: 0,
    });
    const toMsgComp = (group: MsgGroupType) => {
      switch (group.type) {
        case MsgType.Text:
          return (
            <>
              <el-form-item label="文字內容">
                <el-input v-model={group.content}></el-input>
              </el-form-item>
            </>
          );
        case MsgType.Button:
          return (
            <>
              <el-form-item label="標題">
                <el-input v-model={group.title}></el-input>
              </el-form-item>
              <el-form-item label="內文">
                <el-input v-model={group.content}></el-input>
              </el-form-item>
            </>
          );
        case MsgType.Image:
          return (
            <>
              <el-form-item label="圖片">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  {{
                    tip: () => [
                      <div class="el-upload__tip">
                        只能上传 jpg/png 文件，且不超过 500kb
                      </div>,
                    ],
                  }}
                </el-upload>
              </el-form-item>
            </>
          );
        default:
          break;
      }
    };

    const handleCreateMsg = () => {
      if (form.msgGroups.length >= 5) return;
      form.msgGroups.push({
        type: MsgType.Text,
        content: "",
      });
      form.currentMsgIndex = form.msgGroups.length - 1;
    };
    const handleCopyMsg = () => {
      if (form.msgGroups.length >= 5) return;
      form.msgGroups.push(cloneDeep(form.msgGroups[form.currentMsgIndex]));
      form.currentMsgIndex = form.msgGroups.length - 1;
    };
    return () => (
      <Layout>
        <PageHeader />
        <div class="p-3 mt-10 h-[calc(100%-40px)]">
          <div class="bg-white rounded-md h-full p-4 overflow-y-auto">
            <div class="flex justify-between mb-7">
              <h3 class="text-gray-700 text-xl">
                <i class="fab fa-slack-hash mr-2"></i>
                新增關鍵字庫
              </h3>
            </div>
            <div class="px-3">
              <el-form label-position="top" ref="form" label-width="80px">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <el-form-item label="關鍵字">
                    <el-input v-model={form.keyword}></el-input>
                  </el-form-item>
                  <el-form-item label="說明">
                    <el-input v-model={form.desc}></el-input>
                  </el-form-item>

                  <el-form-item label="標籤">
                    <el-select
                      v-model={form.tags}
                      placeholder="請選擇標籤"
                      multiple
                      multiple-limit={3}
                      class="w-full"
                    >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <FormFieldTips
                      class="mt-2"
                      content="標籤設定最多 3 個，目前額度： 0/3"
                    />
                    <FormFieldTips
                      content={`標籤不能使用以下特殊符號：~' \\"/\\#?,*+及空白`}
                    />
                  </el-form-item>
                  <el-form-item label="訊息設定">
                    <el-select
                      v-model={form.tags}
                      placeholder="請選擇動作"
                      class="w-full"
                    ></el-select>
                    <FormFieldTips
                      class="mt-2"
                      content="選擇常用訊息做編輯，或直接開始做訊息設定吧！"
                    />
                  </el-form-item>
                  <el-form-item label="關鍵字動作">
                    <el-select
                      v-model={form.tags}
                      placeholder="請選擇動作"
                      class="w-full"
                    >
                      <el-option label="發送訊息" value="1"></el-option>
                      <el-option label="觸發腳本" value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="狀態">
                    <el-switch
                      v-model={form.status}
                      active-value={1}
                      inactive-color={0}
                    ></el-switch>
                  </el-form-item>
                </div>

                <div class="flex space-x-4 mt-5">
                  <div class="flex-1">
                    <div class="flex space-x-2 mb-4">
                      <el-button
                        icon="fas fa-plus"
                        circle
                        onClick={handleCreateMsg}
                      ></el-button>

                      <el-button
                        icon="fas fa-copy"
                        circle
                        onClick={handleCopyMsg}
                      ></el-button>
                      <IconBtn iconClass="fas fa-plus" />
                      <el-button
                        icon="fas fa-user-cog"
                        circle
                        onClick={() => {
                          form.msgGroups.push({
                            type: MsgType.Text,
                            content: "",
                          });
                          form.currentMsgIndex = form.msgGroups.length - 1;
                        }}
                      ></el-button>
                    </div>
                    <el-tabs
                      type="card"
                      v-model={form.currentMsgIndex}
                      closable
                      tab-remove={(v: any) => console.log(v)}
                    >
                      {form.msgGroups.map((g, i) => (
                        <el-tab-pane label={`第${i + 1}則`} name={i}>
                          <el-form-item>
                            <el-select
                              v-model={g.type}
                              placeholder="請選擇類型"
                              class="w-full"
                            >
                              <el-option value={MsgType.Text} label="文字">
                                <span>文字</span> <i class="fas fa-font"></i>
                              </el-option>
                              <el-option value={MsgType.Button} label="按鈕">
                                <span>按鈕</span> <i class="fas fa-font"></i>
                              </el-option>
                            </el-select>
                          </el-form-item>
                          {toMsgComp(g)}
                        </el-tab-pane>
                      ))}
                    </el-tabs>
                  </div>

                  <div class="w-1/2">
                    <div class="bg-mobile h-[574px] w-[278px] px-[7px] pt-[47px] pb-[67px]">
                      <div class="overflow-y-auto overflow-x-hidden h-full">
                        123
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </Layout>
    );
  },
});
</script>

<style scoped></style>
