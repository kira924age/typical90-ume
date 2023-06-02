import { type Ref } from 'vue'
import { useLocalStorage } from '@/composables/use-local-storage'

interface sortProblemsType {
  sortState: Ref<number>
  sortProblems: () => void
}

/**
 * Creates a sortable problems object with state and a sorting function.
 * @returns {sortProblemsType} - An object containing the sort state and the sort problems function.
 */
const useSortProblems = (): sortProblemsType => {
  const [sortState, setSortState] = useLocalStorage('sortState', 0)

  /**
   * Sorts the problems based on the current sort state.
   * @returns {void}
   */
  const sortProblems = (): void => {
    setSortState((sortState.value + 1) % 3)
  }

  return { sortState, sortProblems }
}

export { useSortProblems }
