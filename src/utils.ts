import { ElMessage } from 'element-plus'
import copy from 'copy-to-clipboard'
import { format } from 'date-fns'
import numeral from 'numeral'

export const toDateTime = (time: number, isUnix?: boolean) =>
  time && format(isUnix ? time * 1000 : time, 'yyyy-MM-dd HH:mm:ss')

export const toCurrency = (num: number, decimal = 0) =>
  numeral(num).format(
    decimal ? `0,0.${Array(decimal).fill('0').join('')}` : '0,0',
  )
export const fileToDataUrl = async (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsDataURL(file)
  })
}

export const reviewBase64Img = (base64Str: string) => {
  const img = new Image()
  img.src = base64Str
  const newWin = window.open('', '_blank')
  newWin?.document.write(img.outerHTML)
  newWin?.document.close()
}

export const copyToClipboard = (str: string) => {
  const result = copy(str)
  if (result) {
    ElMessage('已複製至剪貼簿')
  }
}
