import { computed, type Ref } from 'vue'
import useSWRV from 'swrv'
// import { problemTableCache, setHasClicked2 } from '@/utils/cache'
import problems from '@/assets/problems.json'
import type Submission from '@/types/submission'

interface Submissions {
  // hasClicked: Ref<boolean>
  // setHasClicked: (hasClicked: boolean) => void
  // handleSubmissionFetchButtonClick: () => void
  submissions: Ref<Submission[] | undefined>
  getSubmissionStatusClass: Ref<(problemId: string) => string>
  submissionStatusMap: Ref<Map<string, boolean>>
  getAcCount: Ref<(star: number) => number>
}

/**
 * Fetches data from a specified URL.
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to an array of submissions.
 */
const fetcher = async (url: string): Promise<Submission[]> => {
  const data = await fetch(url).then(async (response) => {
    const result = await response.json()
    return result
  })
  return data
}

/**
 * Manages the submission-related data and functions.
 * @returns {Submissions} - An object containing submission-related data and functions.
 */
const useSubmissions = (userId: Ref<string>, hasClicked: Ref<boolean>): Submissions => {
  // const hasClicked = ref(problemTableCache.hasClicked)
  const BASE_URL = 'https://api.typical90.win/submissions'
  const { data: submissions } = useSWRV(
    () => (hasClicked.value && userId.value !== '' ? `${BASE_URL}/${userId.value}` : undefined),
    fetcher
  )

  /**
   * Computed property that maps problem IDs to submission status (AC or not).
   * @type {Ref<Map<string, boolean>>}
   */
  const submissionStatusMap = computed(() => {
    const result = new Map<string, boolean>()
    if (submissions.value === undefined) {
      return result
    }
    for (const submission of submissions.value) {
      const problemId = submission.problem_id
      if (submission.result === 'AC') {
        result.set(problemId, true)
      }
    }
    return result
  })

  /**
   * Computed function that determines the submission status class for a given problem ID.
   * @type {Ref<(problemId: string) => string>}
   */
  const getSubmissionStatusClass = computed(() => {
    return (problemId: string) => {
      const isOk = submissionStatusMap.value?.get(problemId) ?? false
      return isOk ? 'ac' : 'no'
    }
  })

  // const setHasClicked = (value: boolean): void => {
  //   hasClicked.value = value
  // }

  /**
   * Handles the click event for the submission fetch button.
   * @returns {void}
   */
  // const handleSubmissionFetchButtonClick = (): void => {
  //   setHasClicked(true)
  //   setHasClicked2(true)
  //   console.log('fetch!!!')
  //   console.log(submissions.value)
  // }

  /**
   * Computed property that calculates the count of AC submissions for each star rating.
   * @type {Ref<Map<number, number>>}
   */
  const acCountMap = computed(() => {
    const acCountMap = new Map<number, number>()
    for (const problem of problems) {
      const star = Number(problem.star)
      const isAC: boolean = submissionStatusMap.value.get(problem.id) ?? false

      if (isAC) {
        const acCount: number = acCountMap.get(star) ?? 0
        acCountMap.set(star, acCount + 1)
      }
    }
    return acCountMap
  })

  /**
   * Computed function that returns the count of AC submissions for a given star rating.
   * @type {Ref<(star: number) => number>}
   * @returns {number} - The count of AC submissions for a given star rating.
   */
  const getAcCount = computed(() => {
    return (star: number): number => {
      return acCountMap.value.get(star) ?? 0
    }
  })

  return {
    // hasClicked,
    // setHasClicked,
    // handleSubmissionFetchButtonClick,
    submissions,
    getSubmissionStatusClass,
    submissionStatusMap,
    getAcCount
  }
}

export { useSubmissions }
