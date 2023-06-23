<script setup lang="ts">
import { computed } from 'vue'

const properties = defineProps({
  star: {
    type: Number,
    required: true
  },
  ac: {
    type: Number,
    required: true
  }
})

const numberOfProblem = new Map<number, number>([
  [2, 10],
  [3, 20],
  [4, 14],
  [5, 17],
  [6, 14],
  [7, 15]
])

const solvedRatio = computed(() => {
  return `${String(properties.ac ?? 0)}/${String(numberOfProblem.get(properties.star) ?? 0)}`
})

const label = computed(() => {
  if (properties.star === undefined) {
    return '-'
  }
  return `星${properties.star}`
})

const colors = new Map<number, string>([
  [2, '#808080'],
  [3, '#804000'],
  [4, '#008000'],
  [5, '#00C0C0'],
  [6, '#0000FF'],
  [7, '#C0C000']
])

const color = computed(() => {
  if (properties.star === undefined) {
    return '#808080'
  }
  return colors.get(properties.star) ?? '#808080'
})

const labels = computed(() => {
  return `AC: ${String(properties.ac)}`
})

const chartOptions = computed(() => {
  return {
    chart: {
      height: 240,
      type: 'radialBar',
      animations: {
        enabled: false
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%'
        },
        dataLabels: {
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '18px'
          },
          value: {
            color: '#888',
            fontSize: '24px',
            show: true,
            formatter: (value: number) => {
              return `${value.toFixed(1)}%`
            }
          }
        }
      }
    },
    colors: [color.value],
    stroke: {
      lineCap: 'round'
    },
    labels: [labels.value]
  }
})

const acRatio = computed(() => {
  if (properties.ac === undefined) {
    return 0
  }
  return (properties.ac / (numberOfProblem.get(properties.star) ?? 0)) * 100
})

const series = computed(() => {
  return [acRatio.value]
})
</script>

<template>
  <div>
    <apexchart height="240" type="radialBar" :options="chartOptions" :series="series"></apexchart>
    <div class="pie-status-count">{{ solvedRatio }}</div>
    <div class="pie-status-label">{{ label }}</div>
  </div>
</template>

<style scoped lang="scss">
.pie-status-count {
  font-size: 1.5rem;
  font-weight: 500;
  color: #888;
  text-align: center;
  padding-bottom: 0.5rem;
}

.pie-status-label {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
}
</style>
