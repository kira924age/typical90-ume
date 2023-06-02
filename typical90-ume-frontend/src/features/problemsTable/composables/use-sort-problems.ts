import { type Ref } from 'vue'
import { useLocalStorage } from '@/composables/use-local-storage'

interface sortProblemsType {
  sortState: Ref<number>
  sortProblems: () => void
}
const useSortProblems = (): sortProblemsType => {
  const [sortState, setSortState] = useLocalStorage('sortState', 0)
  const sortProblems = (): void => {
    setSortState((sortState.value + 1) % 3)
  }

  return { sortState, sortProblems }
}

export { useSortProblems }
