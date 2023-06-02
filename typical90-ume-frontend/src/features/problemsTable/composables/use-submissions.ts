import { ref, computed, type Ref } from 'vue'
import { problemTableCache, setHasClicked } from '../cache'
import submission from '../submission.json'
import useSWRV from 'swrv'

const sleep = async (waitSeconds: number): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, waitSeconds * 1000)
  })
}

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

const useSubmissions = (): Submissions => {
  const hasClicked = ref(problemTableCache.hasClicked)
  const { data } = useSWRV(() => (hasClicked.value ? '/api/data' : undefined), FakeAPI)

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

  const getSubmissionStatusClass = computed(() => {
    return (problemId: string) => {
      const isOk = submissionStatusMap.value?.get(problemId) ?? false
      return isOk ? 'ac' : 'no'
    }
  })

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
