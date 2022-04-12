import { ElMessage } from 'element-plus'
import copy from 'copy-to-clipboard'
import { format } from 'date-fns'
import numeral from 'numeral'

export const toDateTime = (time: number, isUnix?: boolean) =>
  time && format(isUnix ? time * 1000 : time, 'yyyy-MM-dd HH:mm:ss')

export const toCurrency = (num: number, decimal = 0) =>
  numeral(num).format(decimal ? `0,0.${Array(decimal).fill('0').join('')}` : '0,0')

interface ImageInfo {
  src: string
  width: number
  height: number
  size: number
}
export const getImageInfo = async (file: Blob): Promise<ImageInfo> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()

      image.src = reader.result as string

      image.onload = (d) => {
        resolve({
          src: image.src,
          width: image.width,
          height: image.height,
          size: +(file.size / 1024 / 1024).toFixed(2),
        })
        return true
      }
      image.onerror = () => {
        reject('image error')
      }
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsDataURL(file)
  })
}
export const getVideoInfo = async (file: Blob): Promise<ImageInfo> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()

      image.src = reader.result as string

      image.onload = (d) => {
        resolve({
          src: image.src,
          width: image.width,
          height: image.height,
          size: +(file.size / 1024 / 1024).toFixed(2),
        })
        return true
      }
      image.onerror = () => {
        reject('image error')
      }
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
