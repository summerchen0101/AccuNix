import { ElMessage } from 'element-plus'

type MessageType = '' | 'success' | 'warning' | 'info' | 'error'
function useAlert() {
  const alert = (message: string, type: MessageType) => {
    ElMessage.closeAll()
    ElMessage({ type, message })
  }

  return alert
}

export default useAlert
