import useAlert from './useAlert'

export default function useImgSizeCheck() {
  const alert = useAlert()
  return (file: File, maxSize: number, unit: 'KB' | 'MB') => {
    const devideNumMap = {
      KB: 1024,
      MB: 1024 * 1024,
    }
    const imgSizeInMb = file.size / devideNumMap[unit]
    if (imgSizeInMb > maxSize) {
      alert(`圖片大小不能超過${maxSize}${unit}`, 'warning')
      return false
    }
    return true
  }
}
