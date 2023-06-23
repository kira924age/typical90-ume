import problems from '@/assets/problems.json'
import type Problem from '@/types/problem'

const problemMap = new Map<string, Problem>(problems.map((problem) => [problem.id, problem]))

export { problemMap }
export { default as problems } from '@/assets/problems.json'
