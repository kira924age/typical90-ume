import { ref, watch, type Ref } from 'vue'

export const useLocalStorage = <T>(key: string, defaultValue: T): [Ref<T>, (v: T) => void] => {
  const a = localStorage.getItem(key)

  const value: Ref<T> = ref(a === null ? defaultValue : JSON.parse(a))
  const setValue = (v: T): void => {
    value.value = v
  }

  watch([key, value], () => {
    localStorage.setItem(key, JSON.stringify(value.value))
  })

  return [value, setValue]
}
