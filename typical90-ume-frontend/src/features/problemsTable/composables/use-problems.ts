import problems from '../../../assets/problems.json'
import { computed, type ComputedRef } from 'vue'

type GetProblemLinkFunction = (id: string) => string
type GetStarClassFunction = (id: string) => string
type GetTwitterLinkFunction = (id: string) => string
type GetYouTubeLinkFunction = (id: string) => string

interface Problems {
  getProblemLink: ComputedRef<GetProblemLinkFunction>
  getStarClass: ComputedRef<GetStarClassFunction>
  getTwitterLink: ComputedRef<GetTwitterLinkFunction>
  getYouTubeLink: ComputedRef<GetYouTubeLinkFunction>
}

interface Problem {
  id: string
  twitter: string
  youtube: string
}

const problemMap = new Map<string, Problem>(problems.map((problem) => [problem.id, problem]))

const useProblems = (): Problems => {
  const BASE_URL = 'https://atcoder.jp/contests/typical90/tasks/'
  const getProblemLink: ComputedRef<GetProblemLinkFunction> = computed(() => {
    return (id: string) => `${BASE_URL}${id}`
  })

  const getStarClass: ComputedRef<GetStarClassFunction> = computed(() => {
    return (star: string) => `star-${star}`
  })

  const getTwitterLink: ComputedRef<GetTwitterLinkFunction> = computed(() => {
    return (id: string) => problemMap.get(id)?.twitter ?? ''
  })

  const getYouTubeLink: ComputedRef<GetYouTubeLinkFunction> = computed(() => {
    return (id: string) => problemMap.get(id)?.youtube ?? ''
  })

  return { getProblemLink, getStarClass, getTwitterLink, getYouTubeLink }
}

export { useProblems }
