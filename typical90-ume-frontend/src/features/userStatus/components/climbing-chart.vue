<script setup lang="ts">
import { computed } from 'vue'
import { problemMap } from '@/constants/problem'
import type Submission from '@/types/submission'

const properties = defineProps<{
  submissions?: Submission[] | undefined
}>()

type Series = [number, number]

const stackAreaData = computed(() => {
  const mp = new Map<number, Set<string>>()

  mp.set(2, new Set<string>())
  mp.set(3, new Set<string>())
  mp.set(4, new Set<string>())
  mp.set(5, new Set<string>())
  mp.set(6, new Set<string>())
  mp.set(7, new Set<string>())

  const response = new Map<number, Array<Series>>()
  response.set(2, [])
  response.set(3, [])
  response.set(4, [])
  response.set(5, [])
  response.set(6, [])
  response.set(7, [])

  if (properties.submissions === undefined) {
    return response
  }

  for (const submission of [...properties.submissions].reverse()) {
    const problemId = submission.problem_id
    const unixTime = submission.epoch_second * 1000
    const result = submission.result

    if (result !== 'AC') {
      continue
    }

    const problem = problemMap.get(problemId)
    if (problem === undefined) {
      continue
    }

    const { star } = problem

    const a = mp.get(Number(star))
    if (a instanceof Set<string> && !a.has(problemId)) {
      a.add(problemId)
    }

    for (let star = 2; star <= 7; star++) {
      const b = response.get(Number(star))
      if (b instanceof Array<Series>) {
        b.push([unixTime, mp.get(star)?.size ?? 0])
      }
    }
  }

  return response
})

const series = computed(() => {
  return Array.from({ length: 6 })
    .fill(0)
    .map((_, index) => {
      return {
        name: `星${7 - index}`,
        data: stackAreaData.value.get(7 - index)
      }
    })
})

const chartOptions = {
  chart: {
    type: 'area',
    height: 350,
    stacked: true,
    animations: {
      enabled: false
    }
  },
  colors: ['#C0C000', '#0000FF', '#00C0C0', '#008000', '#804000', '#808080'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  fill: {
    type: 'solid'
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    inverseOrder: true,
    labels: {
      colors: 'gray',
      useSeriesColors: false
    }
  },
  tooltip: {
    inverseOrder: true
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: 'gray'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: 'gray'
      }
    }
  }
}
</script>

<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.apexcharts-tooltip) {
  color: black;
}
</style>
