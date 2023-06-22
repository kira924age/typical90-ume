import { ref, computed, type Ref } from 'vue'
import { problemTableCache, setHasClicked } from '../cache'
import submission from '../submission.json'
import useSWRV from 'swrv'
import problems from '../../../assets/problems.json'
import type Submission from '@/types/submission'

/**
 * Pauses the execution for a specified number of seconds.
 * @param {number} waitSeconds - The number of seconds to wait.
 * @returns {Promise<void>}
 */
const sleep = async (waitSeconds: number): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, waitSeconds * 1000)
  })
}

/**
 * Fake API function that simulates fetching submissions.
 * @returns {Promise<Submission[] | undefined>} - A promise that resolves to an array of submissions or undefined.
 */
const FakeAPI = async (): Promise<Submission[] | undefined> => {
  const result = await sleep(2).then(() => {
    return submission
  })
  return result
}

interface Submissions {
  hasClicked: Ref<boolean>
  handleSubmissionFetchButtonClick: () => void
  submissions: Ref<Submission[] | undefined>
  getSubmissionStatusClass: Ref<(problemId: string) => string>
  submissionStatusMap: Ref<Map<string, boolean>>
  getAcCount: Ref<(star: number) => number>
}

/**
 * Manages the submission-related data and functions.
 * @returns {Submissions} - An object containing submission-related data and functions.
 */
const useSubmissions = (): Submissions => {
  const hasClicked = ref(problemTableCache.hasClicked)
  const { data: submissions } = useSWRV(
    () => (hasClicked.value ? '/api/submissions' : undefined),
    FakeAPI
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

  /**
   * Handles the click event for the submission fetch button.
   * @returns {void}
   */
  const handleSubmissionFetchButtonClick = (): void => {
    hasClicked.value = true
    setHasClicked(true)
  }

  /**
   * Computed property that calculates the count of AC submissions for each star rating.
   * @type {Ref<Map<number, number>>}
   */
  const acCountMap = computed(() => {
    const acCountMap = new Map<number, number>()
    for (const problem of problems) {
      const star: number = Number(problem.star)
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
    hasClicked,
    handleSubmissionFetchButtonClick,
    submissions,
    getSubmissionStatusClass,
    submissionStatusMap,
    getAcCount
  }
}

export { useSubmissions }
