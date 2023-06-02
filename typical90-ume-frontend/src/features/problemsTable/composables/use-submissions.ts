import { ref, computed, type Ref } from 'vue'
import { problemTableCache, setHasClicked } from '../cache'
import submission from '../submission.json'
import useSWRV from 'swrv'

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

interface Submission {
  id: number
  epoch_second: number
  problem_id: string
  contest_id: string
  user_id: string
  language: string
  point: number
  length: number
  result: string
  execution_time: number
}

interface Submissions {
  hasClicked: Ref<boolean>
  handleSubmissionFetchButtonClick: () => void
  data: Ref<Submission[] | undefined>
  getSubmissionStatusClass: Ref<(problemId: string) => string>
  submissionStatusMap: Ref<Map<string, boolean>>
}

/**
 * Manages the submission-related data and functions.
 * @returns {Submissions} - An object containing submission-related data and functions.
 */
const useSubmissions = (): Submissions => {
  const hasClicked = ref(problemTableCache.hasClicked)
  const { data } = useSWRV(() => (hasClicked.value ? '/api/data' : undefined), FakeAPI)

  /**
   * Computed property that maps problem IDs to submission status (AC or not).
   * @type {Ref<Map<string, boolean>>}
   */
  const submissionStatusMap = computed(() => {
    const result = new Map<string, boolean>()
    if (data.value === undefined) {
      return result
    }
    for (const submission of data.value) {
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

  return {
    hasClicked,
    handleSubmissionFetchButtonClick,
    data,
    getSubmissionStatusClass,
    submissionStatusMap
  }
}

export { useSubmissions }
