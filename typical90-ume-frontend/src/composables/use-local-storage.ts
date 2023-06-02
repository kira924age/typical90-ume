import { ref, watch, type Ref } from 'vue'

/**
 * Creates a reactive Ref that is synced with localStorage.
 * @param {string} key - The key used to store the value in localStorage.
 * @param {T} defaultValue - The default value for the Ref.
 * @returns {[Ref<T>, (v: T) => void]} - An array containing the Ref and the setValue function.
 */
export const useLocalStorage = <T>(key: string, defaultValue: T): [Ref<T>, (v: T) => void] => {
  const localStorageItem = localStorage.getItem(key)

  const value: Ref<T> = ref(localStorageItem === null ? defaultValue : JSON.parse(localStorageItem))

  /**
   * Sets the value of the Ref.
   * @param {T} v - The new value for the Ref.
   * @returns {void}
   */
  const setValue = (v: T): void => {
    value.value = v
  }

  watch(value, () => {
    localStorage.setItem(key, JSON.stringify(value.value))
  })

  return [value, setValue]
}
