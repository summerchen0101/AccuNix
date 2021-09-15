import { ref, UnwrapRef } from 'vue'

const useState = function <T>(data: T) {
  const _data = ref(data)

  return [
    _data,
    (newData: T) => {
      _data.value = newData as UnwrapRef<T>
    },
  ] as const
}

export default useState
