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
