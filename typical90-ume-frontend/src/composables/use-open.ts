import { ref, type Ref } from 'vue'

type UseOpenFunction = () => {
  isOpen: Ref<boolean>
  toggleIsOpen: () => void
  setIsOpen: (value: boolean) => void
}

const useOpen: UseOpenFunction = () => {
  const isOpen: Ref<boolean> = ref<boolean>(false)

  type ToggleIsOpenFunction = () => void
  const toggleIsOpen: ToggleIsOpenFunction = () => {
    isOpen.value = !isOpen.value
  }

  type SetIsOpenFunction = (value: boolean) => void
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
