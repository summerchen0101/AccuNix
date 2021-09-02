import { ElMessage } from "element-plus";

function useAlert() {
  const alert = (msg: string) => ElMessage({ type: "error", message: msg });
  return alert;
}

export default useAlert;
