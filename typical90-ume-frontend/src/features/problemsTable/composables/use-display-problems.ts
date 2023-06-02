import { computed, type Ref } from 'vue'
import problems from '../../../assets/problems.json'

interface Problem {
  id: string
  title: string
  problem_index: string
  star: string
  twitter: string
  youtube: string
}

interface DisplayProblems {
  displayProblems: Ref<Problem[]>
}

/**
 * Creates a reactive list of display problems based on various filter and sort options.
 * @param {Ref<boolean>} isHideAC - Ref indicating whether to hide problems with an AC status.
 * @param {Ref<number>} sortState - Ref indicating the sort state: 0 for sorting by problem index, 1 for sorting by star rating, and any other value for sorting by star rating in reverse order.
 * @param {Ref<Map<string, boolean>>} submissionStatusMap - Ref containing the map of problem IDs and their submission status.
 * @returns {DisplayProblems} - An object containing a reactive Ref for the display problems.
 */
const useDisplayProblems = (
  isHideAC: Ref<boolean>,
  sortState: Ref<number>,
  submissionStatusMap: Ref<Map<string, boolean>>
): DisplayProblems => {
  const displayProblems = computed(() => {
    const filteredProblems = isHideAC.value
      ? problems.filter(
          (problem: Problem) => submissionStatusMap?.value?.get(problem.id) === undefined
        ) ?? []
      : problems

    if (sortState.value === 0) {
      return filteredProblems.sort((a, b) => {
        return Number(a.problem_index) - Number(b.problem_index)
      })
    }
    if (sortState.value === 1) {
      return filteredProblems.sort((a, b) => {
        return Number(a.star) - Number(b.star)
      })
    }

    return filteredProblems.sort((a, b) => {
      return Number(b.star) - Number(a.star)
    })
  })

  return { displayProblems }
}

export { useDisplayProblems }
