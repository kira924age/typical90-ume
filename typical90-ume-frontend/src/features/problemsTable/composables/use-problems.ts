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

/**
 * Creates a collection of computed functions to retrieve problem-related data.
 * @returns {Problems} - An object containing computed functions for problem-related data.
 */
const useProblems = (): Problems => {
  const BASE_URL = 'https://atcoder.jp/contests/typical90/tasks/'

  /**
   * Computed function that generates the URL for a given problem ID.
   * @type {ComputedRef<GetProblemLinkFunction>}
   */
  const getProblemLink: ComputedRef<GetProblemLinkFunction> = computed(() => {
    return (id: string) => `${BASE_URL}${id}`
  })

  /**
   * Computed function that generates the CSS class for a given star rating.
   * @type {ComputedRef<GetStarClassFunction>}
   */
  const getStarClass: ComputedRef<GetStarClassFunction> = computed(() => {
    return (star: string) => `star-${star}`
  })

  /**
   * Computed function that retrieves the Twitter link for a given problem ID.
   * @type {ComputedRef<GetTwitterLinkFunction>}
   */
  const getTwitterLink: ComputedRef<GetTwitterLinkFunction> = computed(() => {
    return (id: string) => problemMap.get(id)?.twitter ?? ''
  })

  /**
   * Computed function that retrieves the YouTube link for a given problem ID.
   * @type {ComputedRef<GetYouTubeLinkFunction>}
   */
  const getYouTubeLink: ComputedRef<GetYouTubeLinkFunction> = computed(() => {
    return (id: string) => problemMap.get(id)?.youtube ?? ''
  })

  return { getProblemLink, getStarClass, getTwitterLink, getYouTubeLink }
}

export { useProblems }
