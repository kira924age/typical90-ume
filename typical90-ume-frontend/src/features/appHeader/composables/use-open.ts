import { ref, type Ref } from 'vue'

type UseOpenFunction = () => {
  isOpen: Ref<boolean>
  toggleIsOpen: () => void
  setIsOpen: (value: boolean) => void
}

/**
 * ハンバーガボタンのオープン状態を管理するためのフック関数です。
 * `isOpen` の状態を持ち、オープン状態の切り替えや状態の設定を行う関数を提供します。
 *
 * @returns オープン状態に関連する情報と操作関数を持つオブジェクト
 */
const useOpen: UseOpenFunction = () => {
  const isOpen: Ref<boolean> = ref<boolean>(false)

  type ToggleIsOpenFunction = () => void

  /**
   * `isOpen`の状態を切り替える関数です。
   * `isOpen`の値が真の場合は偽に、偽の場合は真に切り替えます。
   */
  const toggleIsOpen: ToggleIsOpenFunction = () => {
    isOpen.value = !isOpen.value
  }

  type SetIsOpenFunction = (value: boolean) => void

  /**
   * `isOpen`の値を設定する関数です。
   *
   * @param value - 設定する真偽値
   * `isOpen`の値を引数 `value` の値に設定します。
   */
  const setIsOpen: SetIsOpenFunction = (value: boolean) => {
    isOpen.value = value
  }

  return {
    isOpen,
    toggleIsOpen,
    setIsOpen
  }
}

export default useOpen
